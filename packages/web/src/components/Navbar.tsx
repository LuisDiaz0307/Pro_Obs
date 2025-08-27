import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [ipAddress, setIpAddress] = useState("Cargando...");
  const { userControl, userType } = useAuth(); // Asumiendo que tu contexto tiene userName y userType

  useEffect(() => {
    let mounted = true;
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => {
        if (mounted) setIpAddress(data.ip);
      })
      .catch(() => {
        if (mounted) setIpAddress("No disponible");
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="flex justify-between items-center px-6 py-2 shadow bg-white text-sm">
      <span className="text-black font-bold">Red: {ipAddress}</span>

      <div className="flex items-center gap-2">
        <div className="text-right">
          <strong>{userControl || "Invitado"}</strong>
          <p className="text-xs text-gray-500">
            {userType === "admin" ? "Administrador" : "Empleado"}
          </p>
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white text-2xl">
          <FaUserCircle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
