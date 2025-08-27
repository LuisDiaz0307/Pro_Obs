import { useState } from "react";
import {
  FaBell,
  FaExclamationTriangle,
  FaUserShield,
  FaGraduationCap,
  FaSlidersH,
} from "react-icons/fa";

const filtros = ["Todas", "Urgente", "Confidencial", "Capacitación"];

const notificaciones = [
  {
    id: 1,
    tipo: "Urgente",
    titulo: "Fallo de calibración en casco VR #1WWH00B003",
    descripcion:
      "Se detectó un error de calibración en el dispositivo asignado a Carlos Rodríguez. Se requiere revisión técnica inmediata.",
    hora: "Hoy, 09:15 AM",
    icono: <FaExclamationTriangle className="text-yellow-500 text-2xl" />,
  },
  {
    id: 2,
    tipo: "Confidencial",
    titulo: "Actualización de política de seguridad",
    descripcion:
      "Se ha actualizado la política de seguridad para el manejo de datos recopilados durante las evaluaciones. Revise los nuevos procedimientos.",
    hora: "Ayer, 14:30 PM",
    icono: <FaUserShield className="text-yellow-400 text-2xl" />,
  },
  {
    id: 3,
    tipo: "Capacitación",
    titulo: "Nueva capacitación disponible",
    descripcion: "Nuevo módulo obligatorio de capacitación para operadores de grúas.",
    hora: "12/05/2023, 10:45 AM",
    icono: <FaGraduationCap className="text-blue-500 text-2xl" />,
  },
];

const configuraciones = [
  {
    id: "tiempo-real",
    titulo: "Recibir notificaciones en tiempo real",
    descripcion:
      "Recibirá alertas instantáneas cuando ocurran eventos importantes",
  },
  {
    id: "urgentes",
    titulo: "Notificaciones urgentes",
    descripcion: "Mostrar alertas para notificaciones urgentes",
  },
  {
    id: "capacitacion",
    titulo: "Notificaciones de capacitación",
    descripcion: "Recibir alertas sobre nuevas capacitaciones y recordatorios",
  },
  {
    id: "confidenciales",
    titulo: "Notificaciones confidenciales",
    descripcion: "Recibir alertas sobre información confidencial",
  },
];

export default function Notificaciones() {
  const [filtroActivo, setFiltroActivo] = useState("Todas");
  const [switches, setSwitches] = useState(
    configuraciones.reduce((acc, cfg) => {
      acc[cfg.id] = true;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const toggleSwitch = (id: string) =>
    setSwitches((prev) => ({ ...prev, [id]: !prev[id] }));

  const filtradas =
    filtroActivo === "Todas"
      ? notificaciones
      : notificaciones.filter((n) => n.tipo === filtroActivo);

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="bg-white rounded shadow p-4 flex flex-wrap items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {filtros.map((f) => (
            <button
              key={f}
              onClick={() => setFiltroActivo(f)}
              className={`px-4 py-1 rounded border ${
                filtroActivo === f
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 text-blue-600 hover:underline text-sm">
          <FaBell />
          Marcar todas como leídas
        </button>
      </div>

      {/* Lista de notificaciones */}
      <div className="space-y-4">
        {filtradas.map((n) => (
          <div
            key={n.id}
            className="bg-white shadow rounded p-4 flex gap-4 items-start"
          >
            {n.icono}
            <div className="flex-1">
              <h4 className="font-semibold">{n.titulo}</h4>
              <p className="text-sm text-gray-600">{n.descripcion}</p>
              <div className="text-xs text-right text-gray-400">{n.hora}</div>
              <div className="text-sm mt-2 flex gap-4 text-blue-600">
                <button className="hover:underline">Marcar como leída</button>
                <button className="hover:underline">Eliminar</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Configuración */}
      <div className="bg-white rounded shadow p-4 space-y-4">
        <div className="flex items-center gap-2 text-gray-700 text-lg font-semibold">
          <FaSlidersH className="text-blue-600" />
          Configuración de notificaciones
        </div>
        <div className="space-y-4">
          {configuraciones.map((cfg) => (
            <div key={cfg.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{cfg.titulo}</p>
                <p className="text-sm text-gray-500">{cfg.descripcion}</p>
              </div>
              <label className="inline-flex relative items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={switches[cfg.id]}
                  onChange={() => toggleSwitch(cfg.id)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 transition-all"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform peer-checked:translate-x-5 transition-transform"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
