import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex gap-6">
      <Link to="/" className="font-bold text-xl">Utility Web</Link>
      <Link to="/password">🔐 Contraseñas</Link>
      <Link to="/qr">📱 QR</Link>
      <Link to="/code">📱 Codigo de Barras</Link>
      <Link to="/color">📱 Paleta de Colores</Link>
      <Link to="/wheel">📱 Ruleta</Link>
    </nav>
  );
}
