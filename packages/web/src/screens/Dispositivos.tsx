import {
  FaVrCardboard,
  FaUserTie,
  FaInfoCircle,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

const dispositivos = [
  {
    id: "123ABC",
    nombre: "Casco A",
    simulador: "Montacargas",
    version: "1.0",
    estado: "Conectado",
    ultimaConexion: "2025-08-10 12:30",
    conectado: true,
    logs: [
      { tipo: "ok", hora: "12:00", evento: "Conexión establecida" },
      { tipo: "error", hora: "12:05", evento: "Error de sensor" },
    ],
  },
  {
    id: "456DEF",
    nombre: "Casco B",
    simulador: "Grúas",
    version: "1.1",
    estado: "Desconectado",
    ultimaConexion: "2025-08-09 09:45",
    conectado: false,
    logs: [],
  },
];

const dispositivoActivo = dispositivos[0];

const renderIconoLog = (tipo: string) => {
  switch (tipo) {
    case "ok":
      return <FaCheckCircle className="text-green-600" />;
    case "error":
      return <FaTimesCircle className="text-red-600" />;
    case "warning":
      return <FaExclamationTriangle className="text-yellow-500" />;
    default:
      return <FaInfoCircle className="text-gray-500" />;
  }
};

export default function DispositivosVisual() {
  return (
    <div className="p-6 space-y-6">
      {/* Botón de búsqueda */}
      <div className="flex justify-between items-center">
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow">
          Buscar dispositivos
        </button>
      </div>

      {/* Contenedor principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lista de dispositivos */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Dispositivos conectados</h2>
            <FaVrCardboard className="text-blue-600 text-xl" />
          </div>
          <ul>
            {dispositivos.map((d) => (
              <li
                key={d.id}
                className={`flex items-center justify-between p-3 rounded cursor-pointer hover:bg-blue-100 ${
                  d.id === dispositivoActivo.id ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500 text-white rounded-full p-2">
                    <FaVrCardboard />
                  </div>
                  <div>
                    <p className="font-medium">{d.nombre}</p>
                    <p className="text-sm text-gray-500">{d.id}</p>
                  </div>
                </div>
                {d.conectado && (
                  <span className="w-3 h-3 bg-green-500 rounded-full" />
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Detalles del dispositivo seleccionado */}
        <div className="bg-white rounded-lg shadow p-4 flex flex-col justify-between">
          {dispositivoActivo ? (
            <>
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-gray-200 p-4 rounded-full text-4xl">
                    <FaUserTie />
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{dispositivoActivo.nombre}</p>
                    <p className="text-sm text-gray-600">ID: {dispositivoActivo.id}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p>
                    <span className="text-gray-600">Simulador:</span>{" "}
                    <span className="font-medium">{dispositivoActivo.simulador}</span>
                  </p>
                  <p>
                    <span className="text-gray-600">Versión:</span>{" "}
                    <span className="font-medium">{dispositivoActivo.version}</span>
                  </p>
                  <p>
                    <span className="text-gray-600">Estado:</span>{" "}
                    <span
                      className={`font-medium ${
                        dispositivoActivo.estado === "Conectado"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {dispositivoActivo.estado}
                    </span>
                  </p>
                  <p>
                    <span className="text-gray-600">Última conexión:</span>{" "}
                    <span className="font-medium">{dispositivoActivo.ultimaConexion}</span>
                  </p>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded shadow">
                  Evaluar
                </button>
              </div>
            </>
          ) : (
            <div className="text-gray-500 text-sm text-center">
              Selecciona un dispositivo para ver detalles.
            </div>
          )}
        </div>
      </div>

      {/* Sección de Logs del usuario */}
      {dispositivoActivo && (
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4">
            Actividad reciente de {dispositivoActivo.nombre}
          </h3>
          {dispositivoActivo.logs && dispositivoActivo.logs.length > 0 ? (
            <ul className="space-y-3">
              {dispositivoActivo.logs.map((log, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-4 border-b pb-2 text-sm"
                >
                  <div className="text-lg mt-0.5">{renderIconoLog(log.tipo)}</div>
                  <div>
                    <p className="text-gray-800 font-medium">{log.hora}</p>
                    <p className="text-gray-600">{log.evento}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 italic">
              No hay logs registrados para este usuario.
            </p>
          )}
        </div>
      )}

      {/* Mensaje de red */}
      <div className="flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded shadow">
        <FaInfoCircle />
        <span>Asegúrese que el casco esté conectado a la misma red.</span>
      </div>
    </div>
  );
}
