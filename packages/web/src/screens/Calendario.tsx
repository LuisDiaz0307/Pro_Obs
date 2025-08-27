import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { FaCalendarPlus } from "react-icons/fa";

const CalendarioVisual = () => {
  // Simulamos rol para mostrar/ocultar algunas partes visuales
  const role = "admin"; // o "worker"

  // Eventos de ejemplo para mostrar en calendario
  const events = [
    {
      title: "Capacitación Montacargas",
      start: new Date(2023, 4, 9, 9, 0),
      end: new Date(2023, 4, 9, 10, 0),
      type: "capacitación",
    },
    {
      title: "Evaluación Grúas",
      start: new Date(2023, 4, 11, 14, 30),
      end: new Date(2023, 4, 11, 15, 30),
      type: "evaluación",
    },
    {
      title: "Mantenimiento de Simulador",
      start: new Date(2023, 4, 18),
      end: new Date(2023, 4, 18),
      type: "mantenimiento",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Título */}
      <div className="bg-white p-6 rounded-xl shadow flex justify-between items-center">
        <h2 className="text-xl font-semibold">Agenda de capacitaciones</h2>
        {role === "admin" && (
          <FaCalendarPlus className="text-blue-600 text-2xl" />
        )}
      </div>

      {/* Calendario */}
      <div className="bg-white p-4 rounded-xl shadow h-[600px]">
        <Calendar
          localizer={{}} // Omitido para simplificar
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          toolbar={false}
          messages={{
            next: ">",
            previous: "<",
            today: "Hoy",
            month: "Mes",
            week: "Semana",
            day: "Día",
          }}
          eventPropGetter={(event: any) => {
            let bg = "";
            switch (event.type) {
              case "capacitación":
                bg = "#3B82F6";
                break;
              case "evaluación":
                bg = "#1E40AF";
                break;
              case "mantenimiento":
                bg = "#60A5FA";
                break;
            }
            return {
              style: {
                backgroundColor: bg,
                borderRadius: "6px",
                padding: "4px",
                color: "#fff",
              },
            };
          }}
        />
      </div>

      {/* Formulario visible solo para admin */}
      {role === "admin" && (
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Agendar nueva sesión</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">
                Nombre del operador:
              </label>
              <select className="mt-1 w-full border rounded p-2 text-sm" disabled>
                <option>Seleccionar operador</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">
                Tipo de simulador:
              </label>
              <select className="mt-1 w-full border rounded p-2 text-sm" disabled>
                <option>Seleccionar simulador</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Evaluador:</label>
              <select className="mt-1 w-full border rounded p-2 text-sm" disabled>
                <option>Seleccionar evaluador</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Tipo de sesión:</label>
              <select className="mt-1 w-full border rounded p-2 text-sm" disabled>
                <option>Capacitación</option>
                <option>Evaluación</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Fecha:</label>
              <input type="date" className="mt-1 w-full border rounded p-2 text-sm" disabled />
            </div>

            <div>
              <label className="block text-sm font-medium">Hora:</label>
              <input type="time" className="mt-1 w-full border rounded p-2 text-sm" disabled />
            </div>
          </form>

          <div className="mt-4 flex justify-end">
            <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 cursor-not-allowed opacity-50" disabled>
              <FaCalendarPlus /> Agendar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarioVisual;
