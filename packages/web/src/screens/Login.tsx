import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; // <-- importamos navigate

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate(); // <-- usamos useNavigate
  const [numeroControl, setNumeroControl] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleControlChange = (value: string) => {
    setNumeroControl(value);
    setShowPasswordField(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!numeroControl.trim() || !password.trim()) {
      setErrorMessage("Por favor ingresa tu Correo y Contraseña.");
      return;
    }
    try {
      const response = await fetch("https://servergris.ddns.net/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: numeroControl, contrasena: password }),
      });
      const data = await response.json();
      if (response.ok && data.success && data.usuario?.id) {
        // Llamar a login con tipo de usuario y nombre
        const role = data.usuario.rol === "admin" ? "admin" : "worker";
        login(role, data.usuario.nombre);
        setErrorMessage("");

        role === "admin";

        // 🔹 Redirección según rol
        if (role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/estadisticas");
        }
      } else {
        setErrorMessage(
          data.message ?? "Número de control o contraseña incorrectos."
        );
      }
    } catch (error) {
      console.error("Error de login:", error);
      setErrorMessage("No se pudo conectar al servidor.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="transform scale-90 bg-white p-8 rounded-lg shadow-md w-full max-w-md transition-transform">
        <div className="flex justify-center mb-4">
          <FaUserCircle className="text-6xl text-blue-400" />
        </div>
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">
          VR Monitor
        </h1>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium">Correo</label>
          <input
            type="text"
            value={numeroControl}
            onChange={(e) => handleControlChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Ejemplo: A2345 o E2345"
            required
          />

          {showPasswordField && (
            <>
              <label className="block mb-2 text-sm font-medium">Contraseña</label>
              <div className="relative mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Contraseña"
                />
                <button
                  type="button"
                  className="absolute right-3 top-2 text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              <div className="text-right text-sm mb-4">
                <a href="#" className="text-blue-600 hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Iniciar sesión
          </button>
        </form>

        <p className="text-xs text-center text-gray-500 mt-6">
          © 2025 VR Monitor. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};

export default Login;
