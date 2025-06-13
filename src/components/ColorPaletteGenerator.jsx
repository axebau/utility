import { useState } from "react";
import chroma from "chroma-js";
import { FaEyeDropper } from "react-icons/fa"; // 👈 nuevo

const harmonyTypes = ["analogous", "complement", "triad", "splitcomplement"];

function generatePalette(baseColor, type) {
  switch (type) {
    case "analogous":
      return chroma
        .scale([
          chroma(baseColor).set("hsl.h", "-30"),
          baseColor,
          chroma(baseColor).set("hsl.h", "+30")
        ])
        .colors(5);
    case "complement":
      return [baseColor, chroma(baseColor).set("hsl.h", "+180").hex()];
    case "triad":
      return [
        baseColor,
        chroma(baseColor).set("hsl.h", "+120").hex(),
        chroma(baseColor).set("hsl.h", "-120").hex()
      ];
    case "splitcomplement":
      return [
        baseColor,
        chroma(baseColor).set("hsl.h", "+150").hex(),
        chroma(baseColor).set("hsl.h", "-150").hex()
      ];
    default:
      return [baseColor];
  }
}

export default function ColorPaletteGenerator() {
  const [baseColor, setBaseColor] = useState("#6b5b95");
  const [harmony, setHarmony] = useState("analogous");
  const palette = generatePalette(baseColor, harmony);

  const handlePickColor = async () => {
    if (!window.EyeDropper) {
      alert("Tu navegador no soporta el selector de color (EyeDropper).");
      return;
    }

    try {
      const eyeDropper = new EyeDropper();
      const result = await eyeDropper.open();
      setBaseColor(result.sRGBHex);
    } catch (error) {
      console.error("EyeDropper error:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-xl shadow-xl">
      <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-6">
        🎨 Generador de Paletas de Colores
      </h2>

      <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <label className="text-lg font-semibold text-gray-700">Color Base:</label>
          <input
            type="color"
            value={baseColor}
            onChange={(e) => setBaseColor(e.target.value)}
            className="w-12 h-12 rounded-md shadow-lg border border-gray-300 cursor-pointer appearance-none p-0"
          />
          <button
            onClick={handlePickColor}
            title="Seleccionar color con gotero"
            className="p-2 rounded-md hover:bg-purple-200 transition"
          >
            <FaEyeDropper className="text-2xl text-black-800" />
          </button>
          <span className="font-mono text-gray-600">{baseColor}</span>
        </div>

        <div className="flex items-center gap-4">
          <label className="text-lg font-semibold text-gray-700">Armonía:</label>
          <select
            value={harmony}
            onChange={(e) => setHarmony(e.target.value)}
            className="p-3 rounded-lg border border-purple-300 focus:outline-none focus:ring-4 focus:ring-purple-400 transition"
          >
            <option value="analogous">Análoga</option>
            <option value="complement">Complementaria</option>
            <option value="triad">Tríada</option>
            <option value="splitcomplement">Complementaria Dividida</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {palette.map((color, i) => (
          <div
            key={i}
            className="h-32 rounded-xl shadow-md flex flex-col items-center justify-end p-2 text-white font-mono"
            style={{ backgroundColor: color }}
          >
            <span className="bg-black/30 px-2 py-1 rounded">{color}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
