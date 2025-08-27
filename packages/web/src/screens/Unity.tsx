import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

interface MessageLog {
  type: "in" | "out";
  message: string;
  timestamp: Date;
}

const Unity = () => {
  const [messageLog, setMessageLog] = useState<MessageLog[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, wsMessages, login } = useAuth();

  // Iniciar sesión al montar el componente (simulación de autenticación)
  useEffect(() => {
    login("worker","12345");
  }, [login]);

  // Cada vez que cambian los mensajes WebSocket, agregarlos al log
  useEffect(() => {
    if (wsMessages.length > 0) {
      const ultimo = wsMessages[wsMessages.length - 1];
      if (
        ultimo &&
        typeof ultimo.type === "string" &&
        (ultimo.type === "in" || ultimo.type === "out") &&
        typeof ultimo.data !== "undefined"
      ) {
        addToLog(ultimo.type, ultimo.data);
      } else {
        console.warn("⚠️ Mensaje WebSocket con estructura inesperada:", ultimo);
        addToLog("out", "Mensaje con estructura inesperada");
      }
    }
  }, [wsMessages]);

  // Función para agregar mensajes al log (mantiene solo últimos 100)
  const addToLog = (type: "in" | "out", message: any) => {
    const logEntry =
      typeof message === "object" ? JSON.stringify(message) : String(message);
    setMessageLog((prev) => [
      ...prev.slice(-99), // solo últimos 100
      {
        type,
        message: logEntry,
        timestamp: new Date(),
      },
    ]);
  };

  // Manejo de mensajes recibidos desde Unity via window.postMessage
  const handleUnityMessage = async (event: MessageEvent) => {
    try {
      const data = JSON.parse(event.data);

      const nombreValido =
        typeof data.nombreAccion === "string" && data.nombreAccion.trim() !== "";
      const descripcionValida =
        typeof data.descripcion === "string" && data.descripcion.trim() !== "";

      if (!nombreValido || !descripcionValida) {
        console.warn("⚠️ Datos inválidos recibidos desde Unity:", data);
        return;
      }

      // Aquí puedes agregar lógica extra para manejar los datos recibidos

    } catch (e) {
      console.error("❌ Error al procesar mensaje desde Unity:", e);
    }
  };

  // Listener global para mensajes de Unity
  useEffect(() => {
    window.addEventListener("message", handleUnityMessage);
    return () => {
      window.removeEventListener("message", handleUnityMessage);
    };
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800">Vista de Unity</h1>
      <p className="text-gray-600 mt-2">
        Estado: {isAuthenticated ? "🟢 Conectado" : "🔴 Desconectado"}
      </p>
      {loading && <p className="text-gray-600 mt-2">🔄 Cargando simulación...</p>}

      <iframe
        src="https://servergris.ddns.net/unity/webtest/index.html"
        style={{ width: "100%", height: "400px", border: "none" }}
        onLoad={() => setLoading(false)}
        title="Unity Web"
      />

      <div className="max-h-52 overflow-y-scroll bg-gray-800 p-2 mt-4 font-mono text-xs">
        {messageLog.map((log, index) => (
          <div
            key={index}
            className={`mb-1 ${
              log.type === "in" ? "text-green-400" : "text-blue-400"
            }`}
          >
            [{log.timestamp.toLocaleTimeString()}] {log.type === "in" ? "←" : "→"}{" "}
            {log.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Unity;
