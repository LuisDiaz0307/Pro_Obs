import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaChartLine,
  FaVrCardboard,
  FaClipboardCheck,
  FaFileAlt,
  FaChartBar,
  FaCalendarAlt,
  FaBell,
  FaBars,
  FaSignOutAlt,
  FaCogs,
  FaPoll,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { userType, logout } = useAuth();

  const currentPath = location.pathname.replace("/", "") || "dashboard";

  // Menú diferente según tipo de usuario
  const menuItems =
    userType === "admin"
      ? [
          { key: "dashboard", label: "Dashboard", icon: <FaChartLine /> },
          { key: "dispositivos", label: "Dispositivos", icon: <FaCogs /> },
          { key: "evaluacion", label: "Evaluación", icon: <FaClipboardCheck /> },
          { key: "resultados", label: "Resultados", icon: <FaPoll /> },
          { key: "estadisticas", label: "Estadísticas", icon: <FaChartBar /> },
          { key: "calendario", label: "Calendario", icon: <FaCalendarAlt /> },
          { key: "notificaciones", label: "Notificaciones", icon: <FaBell /> },
          { key: "unity", label: "Unity", icon: <FaVrCardboard /> },
          { key: "test", label: "Test", icon: <FaVrCardboard /> },
          //{ key: "logs", label: "Logs", icon: <FaFileAlt /> }, // Opcional
        ]
      : [
        /*
          { key: "resultados", label: "Resultados", icon: <FaFileAlt /> },
          { key: "estadisticas", label: "Estadísticas", icon: <FaChartBar /> },
          { key: "calendario", label: "Calendario", icon: <FaCalendarAlt /> },
          { key: "notificaciones", label: "Notificaciones", icon: <FaBell /> },
          { key: "test", label: "Test", icon: <FaVrCardboard /> },
           */
          { key: "dashboard", label: "Dashboard", icon: <FaChartLine /> },
          { key: "dispositivos", label: "Dispositivos", icon: <FaCogs /> },
          { key: "evaluacion", label: "Evaluación", icon: <FaClipboardCheck /> },
          { key: "resultados", label: "Resultados", icon: <FaPoll /> },
          { key: "estadisticas", label: "Estadísticas", icon: <FaChartBar /> },
          { key: "calendario", label: "Calendario", icon: <FaCalendarAlt /> },
          { key: "notificaciones", label: "Notificaciones", icon: <FaBell /> },
          { key: "unity", label: "Unity", icon: <FaVrCardboard /> },
          { key: "test", label: "Test", icon: <FaVrCardboard /> },
        ];

  // Función para cerrar sesión
  const handleLogout = () => {
    logout();
    localStorage.clear();
    alert("Sesión cerrada con éxito.");
    navigate("/login");
  };

  return (
    <aside
      className={`${
        sidebarOpen ? "w-56" : "w-16"
      } bg-blue-800 text-white h-full p-3 flex flex-col transition-all duration-300`}
    >
      {/* Encabezado y botón para contraer o expandir */}
      <div
        className={`mb-6 flex ${
          sidebarOpen ? "justify-between" : "justify-center"
        } items-center`}
      >
        {sidebarOpen && (
          <h2 className="text-xl font-bold whitespace-nowrap">VR Monitor</h2>
        )}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white hover:text-gray-300 text-base"
          title={sidebarOpen ? "Contraer menú" : "Expandir menú"}
        >
          <FaBars />
        </button>
      </div>

      {/* Menú de navegación */}
      <ul className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <li key={item.key}>
            <Link
              to={`/${item.key}`}
              title={!sidebarOpen ? item.label : ""}
              className={`flex items-center ${
                sidebarOpen ? "justify-start" : "justify-center"
              } gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors duration-200 hover:bg-blue-700 ${
                currentPath === item.key ? "bg-blue-700" : ""
              }`}
            >
              <div className="text-lg">{item.icon}</div>
              {sidebarOpen && <span className="text-sm">{item.label}</span>}
            </Link>
          </li>
        ))}
      </ul>

      {/* Botón para cerrar sesión */}
      <div className="mt-6">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center ${
            sidebarOpen ? "justify-start gap-3" : "justify-center"
          } px-3 py-2 rounded-md hover:bg-blue-700 transition`}
          title="Cerrar sesión"
        >
          <FaSignOutAlt className="text-lg" />
          {sidebarOpen && <span className="text-sm">Cerrar sesión</span>}
        </button>
      </div>
    </aside>
  );
}
