import { useState, useRef } from "react";
import Barcode from "react-barcode";

const barcodeTypes = [
  {
    id: "code128",
    label: "Code128 (alfanumérico)",
    example: "ABC123",
  },
  {
    id: "ean13",
    label: "EAN13 (13 dígitos)",
    example: "1234567890128",
  },
  {
    id: "upc",
    label: "UPC (12 dígitos)",
    example: "123456789012",
  },
];

export default function BarcodeGenerator() {
  const [text, setText] = useState("");
  const [type, setType] = useState("code128");
  const [show, setShow] = useState(false);
  const barcodeRef = useRef(null);

  const isValidInput = () => {
    if (type === "ean13") return /^\d{13}$/.test(text);
    if (type === "upc") return /^\d{12}$/.test(text);
    return text.length > 0;
  };

  const handleGenerate = () => {
    if (!isValidInput()) {
      alert(
        type === "ean13"
          ? "EAN13 requiere 13 dígitos numéricos."
          : type === "upc"
          ? "UPC requiere 12 dígitos numéricos."
          : "Por favor introduce un valor válido."
      );
      setShow(false);
      return;
    }
    setShow(true);
  };

  // Función para descargar el SVG renderizado como PNG
  const downloadPNG = () => {
    if (!barcodeRef.current) return;

    const svg = barcodeRef.current.querySelector("svg");
    if (!svg) return alert("No se encontró el código para descargar.");

    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext("2d");
      // Fondo blanco para PNG con fondo blanco
      context.fillStyle = "#fff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0);

      URL.revokeObjectURL(url);
      canvas.toBlob((blob) => {
        if (!blob) return alert("Error al generar la imagen.");
        const a = document.createElement("a");
        a.download = `barcode_${text}.png`;
        a.href = URL.createObjectURL(blob);
        a.click();
        URL.revokeObjectURL(a.href);
      }, "image/png");
    };

    image.onerror = () => alert("Error al cargar la imagen SVG.");
    image.src = url;
  };

  return (
    <div className="max-w-xl mx-auto bg-gradient-to-br from-green-100 via-teal-100 to-cyan-100 rounded-xl shadow-lg p-8">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-teal-700 drop-shadow-lg">
        Generador de Códigos de Barras 🏷️
      </h2>

      <label className="block mb-4">
        <span className="text-lg text-gray-700 font-semibold mb-2 block">
          Tipo de Código (con vista previa)
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {barcodeTypes.map((option) => (
            <button
              key={option.id}
              onClick={() => setType(option.id)}
              className={`p-3 rounded-lg border transition-all ${
                type === option.id
                  ? "border-teal-600 bg-white shadow-md"
                  : "border-gray-300 bg-white"
              } hover:border-teal-400`}
            >
              <p className="text-sm font-medium text-gray-700 mb-1 text-center">
                {option.label}
              </p>
              <div className="flex justify-center">
                <Barcode
                  value={option.example}
                  format={option.id.toUpperCase()}
                  width={1.5}
                  height={40}
                  displayValue={false}
                  background="#ffffff"
                />
              </div>
            </button>
          ))}
        </div>
      </label>

      <label className="block mb-6">
        <span className="text-lg text-gray-700 font-semibold">
          Texto o Número para el Código
        </span>
        <input
          type="text"
          placeholder={
            type === "ean13"
              ? "13 dígitos numéricos"
              : type === "upc"
              ? "12 dígitos numéricos"
              : "Texto o números"
          }
          className="w-full mt-2 p-3 rounded-lg border border-teal-300 focus:outline-none focus:ring-4 focus:ring-teal-400 transition"
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={type === "ean13" ? 13 : type === "upc" ? 12 : 50}
        />
      </label>

      <button
        onClick={handleGenerate}
        className="w-full bg-gradient-to-r from-teal-600 to-cyan-700 text-white py-3 rounded-lg font-bold text-lg
                   shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl 
                   active:scale-95 focus:outline-none focus:ring-4 focus:ring-cyan-400 relative overflow-hidden"
      >
        🏷️ Generar Código de Barras
      </button>

      <div
        ref={barcodeRef}
        className="mt-8 bg-white border border-teal-300 rounded-xl p-6 flex flex-col justify-center items-center min-h-[280px]"
      >
        {show ? (
          <>
            <Barcode
              value={text}
              format={type}
              width={2}
              height={100}
              displayValue={true}
              fontSize={18}
              background="#ffffff"
              lineColor="#047857"
            />
            <button
              onClick={downloadPNG}
              className="mt-6 bg-teal-600 hover:bg-teal-700 text-white py-2 px-6 rounded-lg font-semibold transition"
            >
              📥 Descargar como PNG
            </button>
          </>
        ) : (
          <p className="text-teal-300 text-center px-4 select-none">
            Introduce un texto válido y presiona "Generar Código de Barras"
          </p>
        )}
      </div>
    </div>
  );
}
