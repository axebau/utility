import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center mt-20">
      <h2 className="text-4xl font-bold mb-4">404 - Página no encontrada</h2>
      <p className="mb-6">Lo sentimos, la página que buscas no existe.</p>
      <Link
        to="/"
        className="text-blue-600 hover:underline font-semibold"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
