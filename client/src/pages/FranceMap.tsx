import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Stepper from "../components/Stepper.tsx";
import RegionMap from "../components/RegionMap.tsx";
import DepartementSelector from "../components/DepartementSelector.tsx";
import FormationSelector from "../components/FormationSelector.tsx";
import axios from "axios";
import { useEffect } from "react";
const departementsByRegion = {
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
}; // Garde ton objet ici
const formations = [
  "VTC",
  "TAXI",
  "PERMIS C",
  "PERMIS B",
  "Moniteur Auto-école",
];
const FranceMap = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedDepartement, setSelectedDepartement] = useState<string>("");
  const [selectedFormation, setSelectedFormation] = useState<string>("");
  const [validated, setValidated] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [sort, setSort] = useState("");

  const currentStep = validated
    ? 4
    : selectedFormation
    ? 3
    : selectedRegion
    ? 2
    : 1;

  const handleValidate = (formation: string) => {
    setSelectedFormation(formation);
    setValidated(true);
  };

  useEffect(() => {
    if (
      validated &&
      selectedRegion &&
      selectedDepartement &&
      selectedFormation
    ) {
      const [sortBy, order] = sort.split("-");
      axios
        .get("http://localhost:5000/api/formations", {
          params: {
            region: selectedRegion,
            departement: selectedDepartement,
            type: selectedFormation,
            sortBy,
            order,
          },
        })
        .then((res) => setResults(res.data))
        .catch((err) => console.error("Erreur chargement formations :", err));
    }
  }, [validated, selectedRegion, selectedDepartement, selectedFormation, sort]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 text-center">
      <Stepper currentStep={currentStep} />

      <AnimatePresence mode="wait">
        {!selectedRegion && !validated && (
          <motion.div key="map" {...anim}>
            <RegionMap onRegionSelect={setSelectedRegion} />
          </motion.div>
        )}

        {selectedRegion && !selectedDepartement && !validated && (
          <motion.div key="departements" {...anim}>
            <DepartementSelector
              region={selectedRegion}
              departements={departementsByRegion[selectedRegion] || []}
              onSelect={setSelectedDepartement}
              onBack={() => setSelectedRegion(null)}
            />
          </motion.div>
        )}

        {selectedDepartement && !validated && (
          <motion.div key="formations" {...anim}>
            <FormationSelector
              region={selectedRegion!}
              departement={selectedDepartement}
              formations={formations}
              onValidate={handleValidate}
              onBack={() => setSelectedDepartement("")}
            />
          </motion.div>
        )}

        {validated && (
          <motion.div key="results" {...anim}>
            <h2 className="text-green-600 mb-2">✅ Formation validée</h2>
            <p className="mb-4">
              Résultats pour <strong>{selectedFormation}</strong> en{" "}
              <strong>{selectedDepartement}</strong>, région{" "}
              <strong>{selectedRegion}</strong>
            </p>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="mb-4 border p-2 rounded"
            >
              <option value="">-- Trier par --</option>
              <option value="prix-asc">Prix (croissant)</option>
              <option value="prix-desc">Prix (décroissant)</option>
              <option value="avis-desc">Avis (meilleurs d'abord)</option>
              <option value="duree-asc">Durée (courte d'abord)</option>
            </select>

            {results.length > 0 ? (
              <table className="w-full border text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th>Agence</th>
                    <th>Prix</th>
                    <th>Durée</th>
                    <th>Site web</th>
                    <th>Avis</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r, i) => (
                    <tr key={i} className="border-t text-center">
                      <td>{r.agence}</td>
                      <td>{r.prix} €</td>
                      <td>{r.duree}</td>
                      <td>
                        {r.siteweb ? (
                          <a
                            href={r.siteweb}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                            onClick={() => {
                              axios.post(
                                `http://localhost:5000/api/formations/${r._id}/click`
                              );
                            }}
                          >
                            Visiter
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td>{r.avis}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500">Aucune formation trouvée.</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const anim = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
  transition: { duration: 0.5 },
};

export default FranceMap;
