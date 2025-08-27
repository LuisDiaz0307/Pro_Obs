import React, { createContext, useState, useContext, useEffect, useRef } from "react";

type UserType = "admin" | "worker" | null;

export type WebSocketMessage = {
  type: "in" | "out";
  data: any;
  timestamp: Date;
};

interface AuthContextType {
    
  userType: UserType;
  userControl: string | null;
  isAuthenticated: boolean;
  login: (type: UserType, control: string) => void;
  logout: () => void;
  wsMessages: WebSocketMessage[];
  sendWebSocketMessage: (event: string, data: any) => void;
  contadorAlerta: number;
  contadorNotificacion: number;
  contadorAdvertencia: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userType, setUserType] = useState<UserType>(null);
  const [userControl, setUserControl] = useState<string | null>(null);
  const [wsMessages, setWsMessages] = useState<WebSocketMessage[]>([]);
  const [contadorAlerta, setContadorAlerta] = useState(0);
  const [contadorNotificacion, setContadorNotificacion] = useState(0);
  const [contadorAdvertencia, setContadorAdvertencia] = useState(0);

  const wsRef = useRef<WebSocket | null>(null);

  // isAuthenticated derivado
  const isAuthenticated = userType !== null && userControl !== null;

  // Restaurar sesión desde localStorage
  useEffect(() => {
    const storedRole = localStorage.getItem("role") as UserType;
    const storedControl = localStorage.getItem("control");

    if (storedRole && storedControl) {
      setUserType(storedRole);
      setUserControl(storedControl);
      iniciarWebSocket();
    }
  }, []);

  // Abre WS si no está abierto y hay usuario
  const iniciarWebSocket = () => {
    if (wsRef.current) return; // Ya conectado

    const ws = new WebSocket("wss://servergris.ddns.net/ws");
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("🟢 WebSocket conectado desde AuthContext");
      ws.send(`Usuario conectado: ${userControl}`);
    };

    ws.onmessage = (event) => {
      setWsMessages((prev) => [
        ...prev.slice(-99),
        { type: "in", data: event.data, timestamp: new Date() },
      ]);

      let data;
      try {
        data = JSON.parse(event.data);
      } catch {
        return;
      }

      if (data.nombreAccion === "ALERTA") {
        setContadorAlerta((prev) => prev + 1);
      } else if (data.nombreAccion === "ADVERTENCIA") {
        setContadorAdvertencia((prev) => prev + 1);
      } else if (data.nombreAccion === "NOTIFICATION") {
        setContadorNotificacion((prev) => prev + 1);
      }
    };

    ws.onclose = () => {
      console.log("🔴 WebSocket desconectado");
      wsRef.current = null;
    };
  };

  const login = (type: UserType, control: string) => {
    setUserType(type);
    setUserControl(control);
    localStorage.setItem("role", type || "");
    localStorage.setItem("control", control);
    iniciarWebSocket();
  };

  const logout = () => {
    setUserType(null);
    setUserControl(null);
    localStorage.removeItem("role");
    localStorage.removeItem("control");
    //localStorage.clear();

    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    setWsMessages([]);
    setContadorAlerta(0);
    setContadorNotificacion(0);
    setContadorAdvertencia(0);
  };

  const sendWebSocketMessage = (event: string, data: any) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({ tipo: event, ...data });
      wsRef.current.send(message);
      setWsMessages((prev) => [
        ...prev.slice(-99),
        { type: "out", data: message, timestamp: new Date() },
      ]);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userType,
        userControl,
        isAuthenticated,
        login,
        logout,
        wsMessages,
        sendWebSocketMessage,
        contadorAlerta,
        contadorNotificacion,
        contadorAdvertencia,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
