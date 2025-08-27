// src/screens/Resultados.tsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

interface Resultado {
  id: number;
  nombre: string;
  puntaje: number;
  fecha: string;
}

const Resultados: React.FC = () => {
  const { userType, userControl } = useAuth();
  const [resultados, setResultados] = useState<Resultado[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulación de fetch de resultados
    // En un caso real, harías un fetch con userControl o userType
    const fetchResultados = async () => {
      setLoading(true);
      try {
        // Aquí iría tu API call, por ejemplo:
        // const res = await fetch(`/api/resultados?control=${userControl}`);
        // const data = await res.json();
        // setResultados(data);

        // Simulamos datos:
        const datosFalsos: Resultado[] = [
          { id: 1, nombre: "Evaluación 1", puntaje: 85, fecha: "2025-08-01" },
          { id: 2, nombre: "Evaluación 2", puntaje: 92, fecha: "2025-08-05" },
        ];
        setResultados(datosFalsos);
      } catch (error) {
        console.error("Error cargando resultados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResultados();
  }, [userControl]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Resultados</h1>
      <p className="text-gray-600">
        Usuario: {userControl || "Desconocido"} ({userType || "Sin rol"})
      </p>

      {loading ? (
        <p className="mt-4">Cargando resultados...</p>
      ) : resultados.length === 0 ? (
        <p className="mt-4 text-gray-500">No hay resultados para mostrar.</p>
      ) : (
        <table className="mt-4 w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Nombre</th>
              <th className="border p-2">Puntaje</th>
              <th className="border p-2">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((res) => (
              <tr key={res.id}>
                <td className="border p-2">{res.id}</td>
                <td className="border p-2">{res.nombre}</td>
                <td className="border p-2">{res.puntaje}</td>
                <td className="border p-2">{res.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Resultados;
