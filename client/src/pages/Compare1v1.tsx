import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";

const dropdownVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const Compare1v1 = () => {
  const [formations, setFormations] = useState<any[]>([]);
  const [firstSearch, setFirstSearch] = useState("");
  const [secondSearch, setSecondSearch] = useState("");
  const [first, setFirst] = useState<any>(null);
  const [second, setSecond] = useState<any>(null);
  const [firstOpen, setFirstOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);

  const firstRef = useRef<HTMLDivElement>(null);
  const secondRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/formations").then((res) => {
      setFormations(res.data);
    });
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (firstRef.current && !firstRef.current.contains(e.target as Node)) {
        setFirstOpen(false);
      }
      if (secondRef.current && !secondRef.current.contains(e.target as Node)) {
        setSecondOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const reset = () => {
    setFirst(null);
    setSecond(null);
    setFirstSearch("");
    setSecondSearch("");
  };

  const filteredFirst = formations.filter((f) =>
    `${f.type} ${f.agence}`.toLowerCase().includes(firstSearch.toLowerCase())
  );
  const filteredSecond = formations.filter((f) =>
    `${f.type} ${f.agence}`.toLowerCase().includes(secondSearch.toLowerCase())
  );

  const isBetter = (v1: any, v2: any, type: "number" | "string", inverse = false) => {
    if (type === "number") {
      const a = parseFloat(v1);
      const b = parseFloat(v2);
      if (inverse) return a < b ? "bg-green-100 font-bold" : "";
      return a > b ? "bg-green-100 font-bold" : "";
    }
    return v1 !== v2 ? "bg-yellow-100" : "";
  };

  const compareRows = [
    { label: "Type", key: "type", type: "string" },
    { label: "Agence", key: "agence", type: "string" },
    { label: "Région", key: "region", type: "string" },
    { label: "Département", key: "departement", type: "string" },
    { label: "Prix (€)", key: "prix", type: "number", inverse: true },
    { label: "Durée", key: "duree", type: "number", inverse: true },
    { label: "Avis", key: "avis", type: "number" },
    { label: "Clicks", key: "clicks", type: "number" },
  ];

  return (
    <div className="flex justify-center">
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-5xl">
        <div className="text-center mt-8 mb-6">
          <h1 className="text-4xl sm:text-4xl font-extrabold text-blue-700 leading-tight">
            Comparez les formations <br /> 1 contre 1 en toute simplicité
          </h1>
          <p className="mt-2 text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
            Sélectionnez deux formations de votre choix pour les comparer sur plusieurs critères : prix, durée, avis, popularité, etc.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center mb-6">
          {/* Formation 1 */}
          <div ref={firstRef} className="relative w-full md:w-1/2">
            <input
              onFocus={() => setFirstOpen(true)}
              value={firstSearch}
              onChange={(e) => setFirstSearch(e.target.value)}
              placeholder="🔍 Choisir 1ère formation"
              className="w-full border px-4 py-2 rounded shadow-sm focus:outline-none"
            />
            <AnimatePresence>
              {firstOpen && (
                <motion.ul
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute z-10 bg-white w-full mt-1 border rounded shadow max-h-64 overflow-auto"
                >
                  {filteredFirst.map((f) => (
                    <li
                      key={f._id}
                      className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                      onClick={() => {
                        setFirst(f);
                        setFirstSearch(`${f.type} - ${f.agence}`);
                        setFirstOpen(false);
                      }}
                    >
                      {f.type} - {f.agence}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Formation 2 */}
          <div ref={secondRef} className="relative w-full md:w-1/2">
            <input
              onFocus={() => setSecondOpen(true)}
              value={secondSearch}
              onChange={(e) => setSecondSearch(e.target.value)}
              placeholder="🔍 Choisir 2ème formation"
              className="w-full border px-4 py-2 rounded shadow-sm focus:outline-none"
            />
            <AnimatePresence>
              {secondOpen && (
                <motion.ul
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute z-10 bg-white w-full mt-1 border rounded shadow max-h-64 overflow-auto"
                >
                  {filteredSecond.map((f) => (
                    <li
                      key={f._id}
                      className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                      onClick={() => {
                        setSecond(f);
                        setSecondSearch(`${f.type} - ${f.agence}`);
                        setSecondOpen(false);
                      }}
                    >
                      {f.type} - {f.agence}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Tableau de comparaison */}
        {first && second && (
          <>
            <table className="w-full table-auto border shadow rounded bg-white">
              <thead className="bg-gray-100 text-gray-700 text-sm">
                <tr>
                  <th className="py-2 px-4 text-left w-1/3">Critère</th>
                  <th className="py-2 px-4 text-center w-1/3">Formation 1</th>
                  <th className="py-2 px-4 text-center w-1/3">Formation 2</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map(({ label, key, type, inverse = false }, idx) => (
                  <tr key={key} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="py-3 px-4 font-medium">{label}</td>
                    <td className={`py-3 px-4 text-center ${isBetter(first[key], second[key], type, inverse)}`}>
                      {first[key] || "—"}
                    </td>
                    <td className={`py-3 px-4 text-center ${isBetter(second[key], first[key], type, inverse)}`}>
                      {second[key] || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-center mt-6">
              <button
                onClick={reset}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded transition"
              >
                Réinitialiser
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Compare1v1;
