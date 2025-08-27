import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Prueba = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const usuario = location.state?.usuario;

  const [duracion, setDuracion] = useState(5); // minutos
  const [subtareas, setSubtareas] = useState<string[]>([]);

  const tareasDisponibles = [
    "Subtarea 1",
    "Subtarea 2",
    "Subtarea 3",
    "Subtarea 4",
    "Subtarea 5",
    "Subtarea 6",
  ];

  useEffect(() => {
    alert("🚧 Pantalla bajo construcción");
  }, []);

  const handleToggle = (tarea: string) => {
    setSubtareas((prev) =>
      prev.includes(tarea) ? prev.filter((t) => t !== tarea) : [...prev, tarea]
    );
  };

  const handleEnviar = () => {
    const paquete = {
      nombre: usuario?.nombre || "Desconocido",
      id: usuario?.id || "Sin ID",
      duracion,
      subtareas,
    };

    console.log("📦 Paquete enviado a Unity (simulado):", paquete);
    alert(
      "✅ Datos preparados para Unity (simulado).\nRedirigiendo a Dispositivos..."
    );
    navigate("/dispositivos");
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">
        Evaluación para: {usuario?.nombre || "Desconocido"}
      </h1>

      {/* Selección de subtareas */}
      <div className="bg-white p-4 rounded-lg shadow space-y-4">
        <h2 className="text-lg font-semibold">Selecciona las subtareas:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tareasDisponibles.map((tarea) => (
            <label key={tarea} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={subtareas.includes(tarea)}
                onChange={() => handleToggle(tarea)}
              />
              {tarea}
            </label>
          ))}
        </div>
      </div>

      {/* Duración */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">
          Duración de la prueba (minutos)
        </h2>
        <input
          type="number"
          value={duracion}
          onChange={(e) => setDuracion(parseInt(e.target.value) || 1)}
          min={1}
          className="border p-2 rounded w-24"
        />
      </div>

      {/* Botón enviar */}
      <div className="flex justify-end">
        <button
          onClick={handleEnviar}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-semibold"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Prueba;
