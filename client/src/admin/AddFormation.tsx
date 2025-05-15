// AddFormation.tsx
import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const regions: { [key: string]: string[] } = {
  "Auvergne-Rhône-Alpes": [
    "Ain",
    "Allier",
    "Ardèche",
    "Cantal",
    "Drôme",
    "Isère",
    "Loire",
    "Haute-Loire",
    "Puy-de-Dôme",
    "Rhône",
    "Savoie",
    "Haute-Savoie",
  ],
  "Bourgogne-Franche-Comté": [
    "Côte-d'Or",
    "Doubs",
    "Jura",
    "Nièvre",
    "Haute-Saône",
    "Saône-et-Loire",
    "Yonne",
    "Territoire de Belfort",
  ],
  Bretagne: ["Côtes-d'Armor", "Finistère", "Ille-et-Vilaine", "Morbihan"],
  "Centre-Val de Loire": [
    "Cher",
    "Eure-et-Loir",
    "Indre",
    "Indre-et-Loire",
    "Loir-et-Cher",
    "Loiret",
  ],
  Corse: ["Corse-du-Sud", "Haute-Corse"],
  "Grand Est": [
    "Ardennes",
    "Aube",
    "Marne",
    "Haute-Marne",
    "Meurthe-et-Moselle",
    "Meuse",
    "Moselle",
    "Bas-Rhin",
    "Haut-Rhin",
    "Vosges",
  ],
  "Hauts-de-France": ["Aisne", "Nord", "Oise", "Pas-de-Calais", "Somme"],
  "Île-de-France": [
    "Paris",
    "Seine-et-Marne",
    "Yvelines",
    "Essonne",
    "Hauts-de-Seine",
    "Seine-Saint-Denis",
    "Val-de-Marne",
    "Val-d'Oise",
  ],
  Normandie: ["Calvados", "Eure", "Manche", "Orne", "Seine-Maritime"],
  "Nouvelle-Aquitaine": [
    "Charente",
    "Charente-Maritime",
    "Corrèze",
    "Creuse",
    "Dordogne",
    "Gironde",
    "Landes",
    "Lot-et-Garonne",
    "Pyrénées-Atlantiques",
    "Deux-Sèvres",
    "Vienne",
    "Haute-Vienne",
  ],
  Occitanie: [
    "Ariège",
    "Aude",
    "Aveyron",
    "Gard",
    "Haute-Garonne",
    "Gers",
    "Hérault",
    "Lot",
    "Lozère",
    "Hautes-Pyrénées",
    "Pyrénées-Orientales",
    "Tarn",
    "Tarn-et-Garonne",
  ],
  "Pays de la Loire": [
    "Loire-Atlantique",
    "Maine-et-Loire",
    "Mayenne",
    "Sarthe",
    "Vendée",
  ],
  "Provence-Alpes-Côte d'Azur": [
    "Alpes-de-Haute-Provence",
    "Hautes-Alpes",
    "Alpes-Maritimes",
    "Bouches-du-Rhône",
    "Var",
    "Vaucluse",
  ],
};

const dropdownVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const AddFormation = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [formData, setFormData] = useState({
    type: "",
    prix: "",
    duree: "",
    region: "",
    departement: "",
    agence: "",
    siteweb: "",
    avis: "",
  });

  const [status, setStatus] = useState("");
  const [regionOpen, setRegionOpen] = useState(false);
  const [depOpen, setDepOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const inputStyle =
    "border p-3 rounded shadow-sm bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "region" ? { departement: "" } : {}),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await axios.post("http://localhost:5000/api/formations", {
        ...formData,
        prix: Number(formData.prix),
        duree: `${formData.duree} mois`,
        avis: Number(formData.avis),
      });
      setStatus("success");
      setFormData({
        type: "",
        prix: "",
        duree: "",
        region: "",
        departement: "",
        agence: "",
        siteweb: "",
        avis: "",
      });
      if (onSuccess) onSuccess();
    } catch {
      setStatus("error");
    }
  };

  return (
    
     <div className="flex justify-center">
        <div>
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
        Ajouter une Formation
      </h2>
    
  <form
    onSubmit={handleSubmit}
    className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl w-full"
  >
        {/* Type de formation - custom dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setTypeOpen(!typeOpen)}
            className={`${inputStyle} w-full text-left`}
          >
            {formData.type || "-- Type de formation --"}
          </button>
          <AnimatePresence>
            {typeOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-60 overflow-auto"
              >
                {[
                  "VTC",
                  "TAXI",
                  "PERMIS C",
                  "PERMIS B",
                  "Moniteur Auto-école",
                ].map((type) => (
                  <li
                    key={type}
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, type }));
                      setTypeOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                  >
                    {type}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {/* Prix & Durée */}
        <input
          type="number"
          name="prix"
          placeholder="Prix (€)"
          value={formData.prix}
          onChange={handleChange}
          required
          className={inputStyle}
          min={0}
        />
        <input
          type="number"
          name="duree"
          placeholder="Durée (mois)"
          value={formData.duree}
          onChange={handleChange}
          required
          className={inputStyle}
          min={1}
        />

        {/* Région - custom dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setRegionOpen(!regionOpen)}
            className={`${inputStyle} w-full text-left`}
          >
            {formData.region || "-- Région --"}
          </button>
          <AnimatePresence>
            {regionOpen && (
              <motion.ul
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-60 overflow-auto"
              >
                {Object.keys(regions).map((region) => (
                  <li
                    key={region}
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        region,
                        departement: "",
                      }));
                      setRegionOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                  >
                    {region}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {/* Département - custom dropdown */}
        <div className="relative">
          <button
            type="button"
            disabled={!formData.region}
            onClick={() => setDepOpen(!depOpen)}
            className={`${inputStyle} w-full text-left ${
              !formData.region ? "opacity-50" : ""
            }`}
          >
            {formData.departement || "-- Département --"}
          </button>
          <AnimatePresence>
            {depOpen && formData.region && (
              <motion.ul
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-60 overflow-auto"
              >
                {regions[formData.region]?.map((dep) => (
                  <li
                    key={dep}
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, departement: dep }));
                      setDepOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                  >
                    {dep}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {/* Agence & Site */}
        <input
          type="text"
          name="agence"
          placeholder="Nom de l'agence"
          value={formData.agence}
          onChange={handleChange}
          required
          className={inputStyle}
        />
        <input
          type="url"
          name="siteweb"
          placeholder="Lien du site web"
          value={formData.siteweb}
          onChange={handleChange}
          className={inputStyle}
        />

        {/* Avis */}
        <input
          type="number"
          name="avis"
          placeholder="Note moyenne"
          value={formData.avis}
          onChange={handleChange}
          required
          className={inputStyle}
          min={0}
          max={5}
          step={0.1}
        />

        {/* Submit */}
        <button
          type="submit"
          className="md:col-span-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Ajouter
        </button>
      </form>

      {/* Status */}
      {status === "success" && (
        <p className="text-green-600 mt-4">
          ✅ Formation ajoutée avec succès !
        </p>
      )}
      {status === "error" && (
        <p className="text-red-600 mt-4">❌ Erreur lors de l'ajout.</p>
      )}
      {status === "loading" && (
        <p className="text-gray-600 mt-4">⏳ Envoi en cours...</p>
      )}
    </div>
    </div>
  );
};

export default AddFormation;
