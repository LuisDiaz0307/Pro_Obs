import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Layout from "./components/Layout";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import Estadisticas from "./screens/Estadisticas";
import Calendario from "./screens/Calendario";
import Dispositivos from "./screens/Dispositivos";
import Evaluacion from "./screens/Evaluacion";
import Logs from "./screens/Logs";
import Notificaciones from "./screens/Notificaciones";
import Prueba from "./screens/Prueba";
import Resultados from "./screens/Resultados";
import Unity from "./screens/Unity";
import Test from "./screens/Test";

function App() {
  const { userType } = useAuth(); // "admin", "worker" o null

  return (
    <Routes>
      {/* Página inicial */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Páginas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/test" element={<Test />} />

      {/* Páginas protegidas */}
      {userType ? (
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/estadisticas" element={<Estadisticas />} />
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/dispositivos" element={<Dispositivos />} />
          <Route path="/evaluacion" element={<Evaluacion />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/notificaciones" element={<Notificaciones />} />
          <Route path="/prueba" element={<Prueba />} />
          <Route path="/resultados" element={<Resultados />} />
          <Route path="/unity" element={<Unity />} />

          {/* Redirección según rol */}
          <Route
            path="/home"
            element={
              userType === "admin" ? <Navigate to="/dashboard" /> : <Navigate to="/estadisticas" />
            }
          />
        </Route>
      ) : (
        // Redirige a login si no está autenticado
        <Route path="*" element={<Navigate to="/" replace />} />
      )}
    </Routes>
  );
}

export default App;
