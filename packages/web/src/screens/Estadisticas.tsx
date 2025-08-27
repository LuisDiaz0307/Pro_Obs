import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  FaRegFileAlt,
  FaChartPie,
  FaUser,
  FaExclamationTriangle,
} from "react-icons/fa";

const evaluaciones = [
  { mes: "Ene", cantidad: 20 },
  { mes: "Feb", cantidad: 35 },
  { mes: "Mar", cantidad: 40 },
  { mes: "Abr", cantidad: 25 },
  { mes: "May", cantidad: 30 },
];

const desempeño = [
  { mes: "Ene", montacargas: 70, gruas: 60, pesados: 50 },
  { mes: "Feb", montacargas: 75, gruas: 65, pesados: 55 },
  { mes: "Mar", montacargas: 80, gruas: 70, pesados: 60 },
  { mes: "Abr", montacargas: 85, gruas: 75, pesados: 65 },
  { mes: "May", montacargas: 90, gruas: 80, pesados: 70 },
];

const accidentes = [
  { name: "Caídas", value: 10 },
  { name: "Golpes", value: 20 },
  { name: "Cortes", value: 5 },
  { name: "Quemaduras", value: 3 },
  { name: "Electrocución", value: 2 },
];

const rendimientoFiltrado = [
  { name: "Juan", rendimiento: 85 },
  { name: "María", rendimiento: 90 },
  { name: "Pedro", rendimiento: 75 },
  { name: "Ana", rendimiento: 95 },
];

const accidentesColores = [
  "#F87171",
  "#FACC15",
  "#34D399",
  "#60A5FA",
  "#9CA3AF",
];

export default function EstadisticasVisual() {
  return (
    <div className="space-y-8">
      {/* Filtros */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Panel de estadísticas</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="text-sm text-gray-600">Período:</label>
            <select className="w-full mt-1 border rounded-md p-2">
              <option>Este mes</option>
              <option>Últimos 3 meses</option>
              <option>Últimos 6 meses</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-600">Simulador:</label>
            <select className="w-full mt-1 border rounded-md p-2">
              <option>Todos</option>
              <option>Montacargas</option>
              <option>Grúas</option>
              <option>Vehículos pesados</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-600">Usuario/Grupo:</label>
            <select className="w-full mt-1 border rounded-md p-2">
              <option>Todos</option>
              <option>Grupo A</option>
              <option>Grupo B</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Actualizar
            </button>
            <button
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              onClick={() => alert("Botón bajo construcción")}
            >
              PDF
            </button>
          </div>
        </div>
      </div>

      {/* Evaluaciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Número de evaluaciones</h3>
            <FaRegFileAlt className="text-blue-600" />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={evaluaciones}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="cantidad" fill="#3B82F6" name="Evaluaciones" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Desempeño */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Promedio de desempeño</h3>
            <FaChartPie className="text-blue-600" />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={desempeño}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="montacargas" stroke="#3B82F6" />
              <Line type="monotone" dataKey="gruas" stroke="#FBBF24" />
              <Line type="monotone" dataKey="pesados" stroke="#EF4444" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráficas inferiores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Accidentes */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Accidentes más comunes</h3>
            <FaExclamationTriangle className="text-blue-600" />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={accidentes}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label
              >
                {accidentes.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={accidentesColores[index % accidentesColores.length]}
                  />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Rendimiento */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Rendimiento por operador</h3>
            <FaUser className="text-blue-600" />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart layout="vertical" data={rendimientoFiltrado}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 13 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="rendimiento" fill="#34D399" barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
