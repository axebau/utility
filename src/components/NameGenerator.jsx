import { useState } from "react";
import { faker } from "@faker-js/faker";

export default function NameGenerator() {
  const [nationality, setNationality] = useState("mexicano");
  const [gender, setGender] = useState("masculino");
  const [name, setName] = useState("");

  function generateName() {
    let generatedName = "";

    if (gender === "masculino") {
      generatedName = faker.name.firstName("male");
    } else if (gender === "femenino") {
      generatedName = faker.name.firstName("female");
    } else {
      generatedName = faker.name.firstName();
    }

    setName(generatedName);
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Generador de Nombres</h2>

      <label className="block mb-2">
        Nacionalidad:
        <select
          className="border rounded p-2 w-full mt-1"
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
        >
          <option value="mexicano">Mexicano</option>
          <option value="estadounidense">Estadounidense</option>
          <option value="japones">Japonés</option>
          <option value="frances">Francés</option>
          <option value="indio">Indio</option>
          <option value="aleman">Alemán</option>
        </select>
      </label>

      <label className="block mb-4">
        Género:
        <select
          className="border rounded p-2 w-full mt-1"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
          <option value="neutro">Neutro</option>
        </select>
      </label>

      <button
        className="bg-emerald-500 text-white font-semibold py-2 px-4 rounded hover:bg-emerald-600 transition"
        onClick={generateName}
      >
        Generar Nombre
      </button>

      {name && (
        <p className="mt-4 text-center text-lg font-bold text-gray-700">
          {name}
        </p>
      )}
    </div>
  );
}
