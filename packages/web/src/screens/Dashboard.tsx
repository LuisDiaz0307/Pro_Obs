import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Line,
  AreaChart,
  Area,
} from "recharts";
import { FaUsers, FaVrCardboard, FaExclamationTriangle } from "react-icons/fa";
import { PiChartPieSliceFill } from "react-icons/pi";
import { MdShowChart } from "react-icons/md";

const Dashboard = () => {
  // Datos para las gráficas y KPIs
  const costos = [
    { nombre: "Montacargas", ahorro: 60 },
    { nombre: "Grúas", ahorro: 20 },
    { nombre: "Vehículos pesados", ahorro: 75 },
  ];

  const donutData = [
    { name: "Completado", value: 70 },
    { name: "Pendiente", value: 30 },
  ];

  const donutColors = ["#34D399", "#E5E7EB"];

  const lineData = [
    { semana: "Semana 1", promedio: 30, actual: 20 },
    { semana: "Semana 2", promedio: 42, actual: 38 },
    { semana: "Semana 3", promedio: 55, actual: 65 },
    { semana: "Semana 4", promedio: 70, actual: 80 },
    { semana: "Semana 5", promedio: 85, actual: 88 },
  ];

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card
          title="Operadores capacitados"
          value="42"
          icon={<FaUsers className="text-blue-500 text-4xl" />}
        />
        <Card
          title="Simulaciones completadas"
          value="156"
          icon={<FaVrCardboard className="text-blue-500 text-4xl" />}
        />
        <Card
          title="Errores recientes"
          value="3"
          icon={<FaExclamationTriangle className="text-yellow-500 text-4xl" />}
        />
      </div>

      {/* Gráfica de barras */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">
            Ahorro de costos por daños evitados
          </h3>
          <MdShowChart className="text-blue-600 text-2xl" />
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={costos}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombre" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="ahorro" fill="#3B82F6" name="Ahorro (%)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Gráficas adicionales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Donut chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">
              Porcentaje de capacitación total
            </h3>
            <PiChartPieSliceFill className="text-blue-600 text-2xl" />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={donutData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {donutData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={donutColors[index]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">
              Avance del aprendizaje individual
            </h3>
            <MdShowChart className="text-blue-600 text-2xl" />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart
              data={lineData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorPromedio" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <XAxis dataKey="semana" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend
                verticalAlign="top"
                align="center"
                iconType="plainline"
                wrapperStyle={{ paddingBottom: "10px" }}
              />
              <Area
                type="monotone"
                dataKey="promedio"
                stroke="#3B82F6"
                fillOpacity={1}
                fill="url(#colorPromedio)"
                strokeWidth={2}
                name="Promedio"
                dot={{ stroke: "#3B82F6", strokeWidth: 2, fill: "#fff", r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#10B981"
                strokeWidth={2}
                name="Operador Actual"
                dot={{ stroke: "#10B981", strokeWidth: 2, fill: "#fff", r: 4 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const Card = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) => (
  <div className="bg-white p-6 rounded-xl shadow flex items-center justify-between">
    <div>
      <p className="text-gray-500">{title}</p>
      <h2 className="text-3xl font-bold">{value}</h2>
    </div>
    {icon}
  </div>
);

export default Dashboard;
