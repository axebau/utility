import { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QrGenerator() {
  const [mode, setMode] = useState("url");
  const [text, setText] = useState("");
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [encryption, setEncryption] = useState("WPA");

  const qrRef = useRef(null);

  const getQrValue = () => {
    if (mode === "url") {
      return text.trim();
    } else if (mode === "wifi") {
      if (!ssid) return "";
      return `WIFI:T:${encryption};S:${ssid};P:${password};;`;
    }
    return "";
  };

  const qrValue = getQrValue();

  const handleDownload = (format = "png") => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `qr-code.${format}`;
    link.href = canvas.toDataURL(`image/${format}`);
    link.click();
  };

  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-xl shadow-lg p-8 flex flex-col md:flex-row gap-8">
      {/* Izquierda: Formulario */}
      <div className="flex-1 flex flex-col gap-6">
        <h2 className="text-3xl font-extrabold mb-6 text-center md:text-left text-purple-700 drop-shadow-lg">
          Generador de Código QR
        </h2>

        <div className="flex justify-center md:justify-start gap-4 mb-6">
          <button
            onClick={() => setMode("url")}
            className={`px-6 py-3 rounded-lg font-bold transition ${
              mode === "url"
                ? "bg-gradient-to-r from-purple-600 to-indigo-700 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-purple-400 hover:text-white"
            }`}
          >
            URL
          </button>
          <button
            onClick={() => setMode("wifi")}
            className={`px-6 py-3 rounded-lg font-bold transition ${
              mode === "wifi"
                ? "bg-gradient-to-r from-purple-600 to-indigo-700 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-purple-400 hover:text-white"
            }`}
          >
            WiFi
          </button>
        </div>

        {mode === "url" && (
          <input
            type="text"
            placeholder="Introduce texto o URL"
            className="border border-purple-300 rounded-lg p-4 w-full focus:outline-none focus:ring-4 focus:ring-purple-400 transition"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        )}

        {mode === "wifi" && (
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Nombre de red (SSID)"
              className="border border-purple-300 rounded-lg p-4 w-full focus:outline-none focus:ring-4 focus:ring-purple-400 transition"
              value={ssid}
              onChange={(e) => setSsid(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="border border-purple-300 rounded-lg p-4 w-full focus:outline-none focus:ring-4 focus:ring-purple-400 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <select
              className="border border-purple-300 rounded-lg p-4 w-full focus:outline-none focus:ring-4 focus:ring-purple-400 transition"
              value={encryption}
              onChange={(e) => setEncryption(e.target.value)}
            >
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">Sin contraseña</option>
            </select>
          </div>
        )}
      </div>

      {/* Derecha: Código QR y botón de descarga */}
      <div className="w-[280px] h-auto flex flex-col items-center gap-4">
        <div
          className="w-[280px] h-[280px] flex justify-center items-center bg-white rounded-xl shadow-lg"
          ref={qrRef}
        >
          {qrValue ? (
            <QRCodeCanvas
              value={qrValue}
              size={260}
              bgColor="#ffffff"
              fgColor="#6b21a8"
              level="H"
              includeMargin={true}
            />
          ) : (
            <p className="text-purple-300 text-center px-4 select-none">
              Introduce {mode === "url" ? "una URL o texto" : "los datos WiFi"} para generar el código QR
            </p>
          )}
        </div>

        {/* Botones para descargar */}
        {qrValue && (
          <div className="flex gap-4">
            <button
              onClick={() => handleDownload("png")}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition"
            >
              Descargar PNG
            </button>
            <button
              onClick={() => handleDownload("jpeg")}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
            >
              Descargar JPG
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes ping-once {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.7; }
        }
        .animate-ping-once {
          animation: ping-once 0.35s ease;
        }
      `}</style>
    </div>
  );
}
