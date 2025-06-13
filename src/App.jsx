import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import PasswordGenerator from "./components/PasswordGenerator.jsx";
import NameGenerator from "./components/NameGenerator.jsx";
import QrGenerator from "./components/QrGenerator.jsx";
import CodeGenerator from "./components/BarcodeGenerator.jsx";
import ColorGenerator from "./components/ColorPaletteGenerator.jsx";
import WheelGenerator from "./components/wheel.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="p-6 max-w-3xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/password" element={<PasswordGenerator />} />
          <Route path="/name" element={<NameGenerator />} />
           <Route path="/qr" element={<QrGenerator />} />
           <Route path="/code" element={<CodeGenerator />} />
           <Route path="/color" element={<ColorGenerator />} />
           <Route path="/wheel" element={<WheelGenerator />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
