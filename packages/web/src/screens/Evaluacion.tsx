import { useState } from "react";
import {
  FaUserTie,
  FaRegDotCircle,
  FaVrCardboard,
  FaPrint,
  FaTimesCircle,
} from "react-icons/fa";

// Simulación de usuarios con datos mínimos para mostrar UI
const trabajadores = [
  {
    idCasco: "001",
    nombre: "Juan Pérez",
    precision: 85,
    reaccion: 90,
    protocolo: 95,
    errores: [
      {
        titulo: "Error en frenado",
        descripcion: "No aplicó freno a tiempo en la simulación",
        severidad: "Alta",
        color: "bg-red-500 text-white",
      },
      {
        titulo: "Uso incorrecto del volante",
        descripcion: "Giros abruptos que no respetan las normas",
        severidad: "Media",
        color: "bg-yellow-400 text-black",
      },
    ],
    costos: {
      total: "$1200",
      infraestructura: "$700",
      productos: "$300",
      inactividad: "$200",
    },
  },
  {
    idCasco: "002",
    nombre: "María Gómez",
    precision: 75,
    reaccion: 85,
    protocolo: 80,
    errores: [],
    costos: {
      total: "$900",
      infraestructura: "$400",
      productos: "$300",
      inactividad: "$200",
    },
  },
];

export default function Evaluacion() {
  const [usuarioActivo, setUsuarioActivo] = useState(trabajadores[0]);

  return (
    <div className="p-6 space-y-6">
      {/* Lista de usuarios evaluados */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-700">
          Evaluaciones en curso
        </h2>
        <div className="flex gap-4 overflow-x-auto">
          {trabajadores.map((user) => (
            <button
              key={user.idCasco}
              onClick={() => setUsuarioActivo(user)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md shadow text-sm font-medium whitespace-nowrap transition ${
                user.idCasco === usuarioActivo.idCasco
                  ? "bg-blue-600 text-white"
                  : "bg-white hover:bg-blue-50"
              }`}
            >
              <FaUserTie />
              {user.nombre}
            </button>
          ))}
        </div>
      </div>

      {/* Datos del usuario seleccionado */}
      <div className="bg-white shadow rounded-lg p-6 flex items-center gap-6">
        <div className="text-4xl text-gray-600">
          <FaUserTie />
        </div>
        <div>
          <p className="text-lg font-semibold">{usuarioActivo.nombre}</p>
          <p className="text-sm text-gray-600">
            ID: {usuarioActivo.idCasco || "Desconocido"}
          </p>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Panel de desempeño */}
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">
              Desempeño en el simulador de Montacargas
            </h3>
            <FaRegDotCircle className="text-blue-500" />
          </div>

          {/* Barras de desempeño */}
          <div className="space-y-3">
            {[
              {
                label: "Precisión",
                valor: usuarioActivo.precision ?? 0,
                color: "bg-blue-600",
              },
              {
                label: "Tiempo de reacción",
                valor: usuarioActivo.reaccion ?? 0,
                color: "bg-blue-600",
              },
              {
                label: "Cumplimiento de protocolo",
                valor: usuarioActivo.protocolo ?? 0,
                color: "bg-green-500",
              },
            ].map((bar, index) => (
              <div key={index}>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  {bar.label}
                </p>
                <div className="w-full bg-gray-200 h-3 rounded">
                  <div
                    className={`${bar.color} h-3 rounded`}
                    style={{ width: `${bar.valor}%` }}
                  />
                </div>
                <p className="text-right text-sm text-gray-500 mt-1">
                  {bar.valor}%
                </p>
              </div>
            ))}
          </div>

          {/* Errores detectados */}
          <div>
            <h4 className="text-md font-semibold mt-6 mb-2">
              Errores detectados
            </h4>
            {usuarioActivo.errores && usuarioActivo.errores.length > 0 ? (
              <ul className="space-y-3">
                {usuarioActivo.errores.map((e, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <div className="flex items-start gap-3">
                      <FaTimesCircle className="text-red-500 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-800">{e.titulo}</p>
                        <p className="text-sm text-gray-500">{e.descripcion}</p>
                      </div>
                    </div>
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${e.color}`}
                    >
                      {e.severidad}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 italic">Sin errores registrados.</p>
            )}
          </div>
        </div>

        {/* Estimación de daños evitados */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Estimación de daños evitados</h3>
              <FaVrCardboard className="text-blue-500" />
            </div>
            <p className="text-4xl font-bold text-green-500">
              {usuarioActivo.costos?.total || "$0"}
            </p>
            <p className="text-gray-500 mb-4">Costo estimado ahorrado</p>

            <ul className="text-sm space-y-1 text-gray-700">
              <li>
                Daños a infraestructura:{" "}
                <span className="float-right">{usuarioActivo.costos?.infraestructura || "$0"}</span>
              </li>
              <li>
                Daños a productos:{" "}
                <span className="float-right">{usuarioActivo.costos?.productos || "$0"}</span>
              </li>
              <li>
                Tiempo de inactividad:{" "}
                <span className="float-right">{usuarioActivo.costos?.inactividad || "$0"}</span>
              </li>
            </ul>
          </div>

          <div className="mt-6">
            <button
              onClick={() => alert("Botón bajo construcción")}
              className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 rounded shadow text-sm"
            >
              <FaPrint /> Imprimir reporte
            </button>
            <p className="text-xs text-gray-500 text-center mt-1">
              Disponible al finalizar la simulación
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
