// Código JSX completo, ya con la tabla abajo de la ruleta
// Copia y reemplaza tu componente Ruleta por este
import { useState, useRef } from "react";
import { Howl } from "howler";
import "./wheel.css";

const spinSound = new Howl({
  src: ["/sounds/spin.mp3"],
  volume: 0.5,
});

const radius = 150;
const center = radius;

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(x, y, radius, startAngle, endAngle) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M", x, y,
    "L", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
    "Z"
  ].join(" ");
}

export default function Ruleta() {
  const [options, setOptions] = useState([]);
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [currentAngle, setCurrentAngle] = useState(0);
  const [remainingOptions, setRemainingOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [winners, setWinners] = useState([]);
  const wheelRef = useRef(null);

  const addOption = () => {
    if (input.trim()) {
      const updated = [...options, input.trim()];
      setOptions(updated);
      setRemainingOptions(updated);
      setInput("");
      setSelected(null);
    }
  };

  const reset = () => {
    setOptions([]);
    setRemainingOptions([]);
    setSelected(null);
    setCurrentAngle(0);
    setShowModal(false);
    setWinners([]);
    if (wheelRef.current) {
      wheelRef.current.style.transition = "none";
      wheelRef.current.style.transform = "rotate(0deg)";
    }
  };

  const spin = () => {
    if (options.length < 2) {
      alert("Agrega al menos dos opciones para girar.");
      return;
    }

    setSpinning(true);
    setSelected(null);
    setShowModal(false);
    spinSound.play();

    const degreesPerOption = 360 / options.length;
    const selectedIndex = Math.floor(Math.random() * options.length);
    const selectedOption = options[selectedIndex];

    const offsetToCenter = selectedIndex * degreesPerOption + degreesPerOption / 2;
    const extraRotation = 360 * 5;
    const targetAngle = currentAngle + extraRotation - offsetToCenter;

    if (wheelRef.current) {
      wheelRef.current.style.transition = "none";
      wheelRef.current.style.transform = `rotate(${currentAngle}deg)`;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          wheelRef.current.style.transition = "transform 5s ease-out";
          wheelRef.current.style.transform = `rotate(${targetAngle}deg)`;
        });
      });
    }

    setTimeout(() => {
      setSelected(selectedOption);
      setCurrentAngle(targetAngle % 360);
      setSpinning(false);
      const updatedOptions = options.filter((_, i) => i !== selectedIndex);
      setRemainingOptions(updatedOptions);
      setShowModal(true);
      setWinners((prev) => [...prev, selectedOption]);
    }, 5000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 py-10 px-4 space-y-8">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">🎡 Ruleta de Opciones</h2>

      {/* Formulario */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Agregar opción"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={spinning}
          className="border border-purple-400 rounded px-4 py-2 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
        <button
          onClick={addOption}
          disabled={spinning}
          className="bg-purple-400 text-white px-4 py-2 rounded hover:bg-purple-500 font-semibold transition"
        >
          Agregar
        </button>
        <button
          onClick={reset}
          disabled={spinning}
          className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500 font-semibold transition"
        >
          Reiniciar
        </button>
      </div>

      {/* Ruleta */}
<div className="relative mb-6" style={{ width: radius * 2, height: radius * 2 }}>
  <svg
    width={radius * 2}
    height={radius * 2}
    viewBox={`0 0 ${radius * 2} ${radius * 2}`}
    ref={wheelRef}
  >
{options.length === 0 ? (
  <circle
    cx={center}
    cy={center}
    r={radius}
    fill="#f3f4f6"
    stroke="#e5e7eb"
    strokeWidth="2"
  />
) : options.length === 1 ? (
  <>
    <circle
      cx={center}
      cy={center}
      r={radius}
      fill="#fde68a"
      stroke="#fbbf24"
      strokeWidth="2"
    />
    <text
      x={center}
      y={center}
      fill="#7c3aed"
      fontWeight="bold"
      fontSize="18"
      textAnchor="middle"
      alignmentBaseline="middle"
      style={{ userSelect: "none" }}
    >
      {options[0]}
    </text>
  </>
) : (
  options.map((option, i) => {
    const segmentAngle = 360 / options.length;
    const startAngle = i * segmentAngle;
    const endAngle = startAngle + segmentAngle;
    const pathData = describeArc(center, center, radius, startAngle, endAngle);
    const textAngle = startAngle + segmentAngle / 2;
    const textPos = polarToCartesian(center, center, radius * 0.7, textAngle);
    return (
      <g key={i}>
        <path
          d={pathData}
          fill={i % 2 === 0 ? "#fcd34d" : "#fde68a"}
          stroke="#fbbf24"
          strokeWidth="2"
        />
        <text
          x={textPos.x}
          y={textPos.y}
          fill="#7c3aed"
          fontWeight="bold"
          fontSize="14"
          textAnchor="middle"
          alignmentBaseline="middle"
          transform={`rotate(${textAngle + 90}, ${textPos.x}, ${textPos.y})`}
          style={{ userSelect: "none" }}
        >
          {option}
        </text>
      </g>
    );
  })
)}

  </svg>

  {/* Indicador */}
  <div
    style={{
      position: "absolute",
      top: -10,
      left: "50%",
      transform: "translateX(-50%) rotate(180deg)",
      width: 0,
      height: 0,
      borderLeft: "15px solid transparent",
      borderRight: "15px solid transparent",
      borderBottom: "30px solid #f59e0b",
      pointerEvents: "none",
    }}
  />
</div>


      {/* Botón girar */}
      <div className="text-center mb-6">
        <button
          onClick={spin}
          disabled={spinning}
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
        >
          🎲 Girar
        </button>
      </div>

      {/* Tabla de Resultados abajo */}
      {winners.length > 0 && (
        <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-xl border border-purple-200 p-4 mb-6">
          <h3 className="text-xl font-semibold text-purple-800 mb-4 text-center">📝 Resultados</h3>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-purple-200 text-purple-900">
                <th className="border px-3 py-1">#</th>
                <th className="border px-3 py-1">Ganador</th>
              </tr>
            </thead>
            <tbody>
              {winners.map((winner, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-purple-50" : "bg-purple-100"}>
                  <td className="border px-3 py-1 text-center">{index + 1}°</td>
                  <td className="border px-3 py-1 text-center font-semibold">{winner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal de ganador */}
      {showModal && selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-xs mx-4">
            <h3 className="text-xl font-bold text-purple-800 mb-2">🎉 ¡Ganador!</h3>
            <p className="text-2xl font-semibold text-green-600">{selected}</p>
            <button
              onClick={() => {
                setOptions(remainingOptions);
                setSelected(null);
                setCurrentAngle(0);
                setShowModal(false);
                if (wheelRef.current) {
                  wheelRef.current.style.transition = "none";
                  wheelRef.current.style.transform = "rotate(0deg)";
                }
              }}
              className="mt-4 bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
            >
              Cerrar y continuar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
