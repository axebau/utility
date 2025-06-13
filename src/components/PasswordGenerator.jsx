import { useState } from "react";

const LOWER = "abcdefghijklmnopqrstuvwxyz";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:',.<>/?";

function ToggleSwitch({ label, checked, onChange }) {
  return (
    <label className="flex items-center cursor-pointer select-none">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <div
          className={`w-11 h-6 rounded-full transition-colors ${
            checked ? "bg-sky-600" : "bg-gray-300"
          }`}
        />
        <div
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
            checked ? "translate-x-5" : ""
          }`}
        />
      </div>
      <span className="ml-3 text-gray-700 font-semibold">{label}</span>
    </label>
  );
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(12);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const generatePassword = () => {
    let chars = "";
    if (includeLower) chars += LOWER;
    if (includeUpper) chars += UPPER;
    if (includeNumbers) chars += NUMBERS;
    if (includeSymbols) chars += SYMBOLS;

    if (!chars) {
      alert("Selecciona al menos un tipo de carácter");
      setShow(false);
      return;
    }

    let pass = "";
    for (let i = 0; i < length; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(pass);
    setShow(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert("¡Contraseña copiada!");
  };

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-blue-100 via-sky-100 to-cyan-100 rounded-2xl shadow-xl p-8">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-sky-700 drop-shadow-md">
        🔐 Generador de Contraseñas
      </h2>

      <div className="mb-6">
        <label className="block text-lg font-semibold text-gray-700 mb-2">
          Longitud: <span className="text-sky-600">{length}</span>
        </label>
        <input
          type="range"
          min="6"
          max="32"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full accent-sky-600 cursor-pointer"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 mb-8">
        <ToggleSwitch
          label="Minúsculas (abc)"
          checked={includeLower}
          onChange={() => setIncludeLower(!includeLower)}
        />
        <ToggleSwitch
          label="Mayúsculas (ABC)"
          checked={includeUpper}
          onChange={() => setIncludeUpper(!includeUpper)}
        />
        <ToggleSwitch
          label="Números (123)"
          checked={includeNumbers}
          onChange={() => setIncludeNumbers(!includeNumbers)}
        />
        <ToggleSwitch
          label="Símbolos (!@#)"
          checked={includeSymbols}
          onChange={() => setIncludeSymbols(!includeSymbols)}
        />
      </div>

      <button
        onClick={generatePassword}
        className="w-full bg-gradient-to-r from-sky-600 to-blue-700 text-white py-3 rounded-xl font-extrabold text-lg
                   shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300 active:scale-95 focus:outline-none focus:ring-4 focus:ring-sky-400"
      >
        🎲 Generar Contraseña
      </button>

      {show && (
        <div className="mt-8 bg-white border border-sky-300 rounded-xl p-5 flex justify-between items-center shadow-md select-all font-mono text-xl break-words">
          <span>{password}</span>
          <button
            onClick={copyToClipboard}
            className="ml-6 bg-sky-600 hover:bg-sky-700 text-white px-5 py-2 rounded-lg font-semibold shadow transition duration-300"
            aria-label="Copiar contraseña"
          >
            📋 Copiar
          </button>
        </div>
      )}
    </div>
  );
}
