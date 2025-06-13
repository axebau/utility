import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="font-bold text-xl">
          Utility Web
        </Link>

        {/* Botón hamburguesa (visible solo en móvil) */}
        <button
          onClick={() => setMenuAbierto(!menuAbierto)}
          className="sm:hidden focus:outline-none"
          aria-label="Toggle menu"
        >
          {/* Icono hamburguesa */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuAbierto ? (
              // Icono "X" para cerrar
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              // Icono hamburguesa
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Menú de links - oculto en móvil, visible en sm+ */}
        <div className="hidden sm:flex gap-6">
          <Link to="/password">🔐 Contraseñas</Link>
          <Link to="/qr">📱 QR</Link>
          <Link to="/code">📱 Código de Barras</Link>
          <Link to="/color">🎨 Paleta de Colores</Link>
          <Link to="/wheel">🎡 Ruleta</Link>
        </div>
      </div>

      {/* Menú desplegable en móvil */}
      {menuAbierto && (
        <div className="flex flex-col mt-4 gap-4 sm:hidden">
          <Link
            to="/password"
            onClick={() => setMenuAbierto(false)}
            className="block"
          >
            🔐 Contraseñas
          </Link>
          <Link to="/qr" onClick={() => setMenuAbierto(false)} className="block">
            📱 QR
          </Link>
          <Link
            to="/code"
            onClick={() => setMenuAbierto(false)}
            className="block"
          >
            📱 Código de Barras
          </Link>
          <Link
            to="/color"
            onClick={() => setMenuAbierto(false)}
            className="block"
          >
            🎨 Paleta de Colores
          </Link>
          <Link
            to="/wheel"
            onClick={() => setMenuAbierto(false)}
            className="block"
          >
            🎡 Ruleta
          </Link>
        </div>
      )}
    </nav>
  );
}
