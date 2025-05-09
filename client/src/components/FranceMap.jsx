import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/regions-version-simplifiee.geojson";

const formations = ["VTC", "TAXI", "PERMIS C", "PERMIS B", "Moniteur Auto-école"];

const departementsByRegion = {
  "Auvergne-Rhône-Alpes": [
    "Ain", "Allier", "Ardèche", "Cantal", "Drôme",
    "Isère", "Loire", "Haute-Loire", "Puy-de-Dôme",
    "Rhône", "Savoie", "Haute-Savoie"
  ],
  "Bourgogne-Franche-Comté": [
    "Côte-d'Or", "Doubs", "Jura", "Nièvre",
    "Haute-Saône", "Saône-et-Loire", "Yonne", "Territoire de Belfort"
  ],
  "Bretagne": [
    "Côtes-d'Armor", "Finistère", "Ille-et-Vilaine", "Morbihan"
  ],
  "Centre-Val de Loire": [
    "Cher", "Eure-et-Loir", "Indre", "Indre-et-Loire",
    "Loir-et-Cher", "Loiret"
  ],
  "Corse": [
    "Corse-du-Sud", "Haute-Corse"
  ],
  "Grand Est": [
    "Ardennes", "Aube", "Marne", "Haute-Marne", "Meurthe-et-Moselle",
    "Meuse", "Moselle", "Bas-Rhin", "Haut-Rhin", "Vosges"
  ],
  "Hauts-de-France": [
    "Aisne", "Nord", "Oise", "Pas-de-Calais", "Somme"
  ],
  "Île-de-France": [
    "Paris", "Seine-et-Marne", "Yvelines", "Essonne",
    "Hauts-de-Seine", "Seine-Saint-Denis", "Val-de-Marne", "Val-d'Oise"
  ],
  "Normandie": [
    "Calvados", "Eure", "Manche", "Orne", "Seine-Maritime"
  ],
  "Nouvelle-Aquitaine": [
    "Charente", "Charente-Maritime", "Corrèze", "Creuse",
    "Dordogne", "Gironde", "Landes", "Lot-et-Garonne",
    "Pyrénées-Atlantiques", "Deux-Sèvres", "Vienne", "Haute-Vienne"
  ],
  "Occitanie": [
    "Ariège", "Aude", "Aveyron", "Gard", "Haute-Garonne",
    "Gers", "Hérault", "Lot", "Lozère", "Hautes-Pyrénées",
    "Pyrénées-Orientales", "Tarn", "Tarn-et-Garonne"
  ],
  "Pays de la Loire": [
    "Loire-Atlantique", "Maine-et-Loire", "Mayenne", "Sarthe", "Vendée"
  ],
  "Provence-Alpes-Côte d'Azur": [
    "Alpes-de-Haute-Provence", "Hautes-Alpes", "Alpes-Maritimes",
    "Bouches-du-Rhône", "Var", "Vaucluse"
  ]
};


const FranceMap = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedDepartement, setSelectedDepartement] = useState("");
  const [selectedFormation, setSelectedFormation] = useState("");
  const [validated, setValidated] = useState(false);

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
    setSelectedDepartement("");
    setSelectedFormation("");
    setValidated(false);
  };

  const handleBackToMap = () => {
    setSelectedRegion(null);
    setSelectedDepartement("");
    setSelectedFormation("");
    setValidated(false);
  };

  const handleValidate = (formation) => {
    setSelectedFormation(formation);
    setValidated(true);
    setTimeout(() => {
      alert(`✅ Redirection vers : ${formation} (${selectedDepartement}, ${selectedRegion})`);
      // window.location.href = `/formation/${formation.toLowerCase().replace(/\s+/g, "-")}`;
    }, 1000);
  };

  return (
    <div style={{ width: "100%", maxWidth: "900px", margin: "auto", padding: "20px", textAlign: "center" }}>
      <AnimatePresence mode="wait">
        {!selectedRegion && !validated && (
          <motion.div
            key="map"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            <h2 style={{ marginBottom: "20px" }}>Cliquez sur une région</h2>
            <ComposableMap
              projection="geoAzimuthalEqualArea"
              projectionConfig={{ scale: 1200, center: [2.5, 46.5] }}
              width={800}
              height={800}
              style={{ width: "100%", height: "auto" }}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => handleRegionClick(geo.properties.nom)}
                      style={{
                        default: {
                          fill: "#e0e0e0",
                          stroke: "#fff",
                          strokeWidth: 0.5,
                          outline: "none",
                          cursor: "pointer",
                        },
                        hover: {
                          fill: "#00bcd4",
                          stroke: "#333",
                          strokeWidth: 0.8,
                        },
                        pressed: {
                          fill: "#0077cc",
                        },
                      }}
                    />
                  ))
                }
              </Geographies>
            </ComposableMap>
          </motion.div>
        )}

        {selectedRegion && !selectedDepartement && !validated && (
          <motion.div
            key="departements"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            <h2 style={{ color: "#0077cc" }}>Région sélectionnée : {selectedRegion}</h2>
            <h3 style={{ marginTop: "30px" }}>Choisir un département :</h3>

            <div style={{ marginTop: "20px", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "15px" }}>
              {(departementsByRegion[selectedRegion] || []).map((dept) => (
                <motion.div
                  key={dept}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDepartement(dept)}
                  style={{
                    width: "200px",
                    height: "80px",
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1rem",
                    cursor: "pointer",
                  }}
                >
                  {dept}
                </motion.div>
              ))}
            </div>

            <button
              onClick={handleBackToMap}
              style={{
                marginTop: "30px",
                padding: "10px 20px",
                background: "#f0f0f0",
                border: "1px solid #ccc",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              ⬅️ Retour à la carte
            </button>
          </motion.div>
        )}

        {selectedDepartement && !validated && (
          <motion.div
            key="formations"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            <h2 style={{ color: "#0077cc" }}>
              Département : {selectedDepartement} ({selectedRegion})
            </h2>
            <h3 style={{ marginTop: "30px" }}>Choisir la formation :</h3>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
              {formations.map((formation) => (
                <motion.div
                  key={formation}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleValidate(formation)}
                  style={{
                    width: "200px",
                    height: "100px",
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1rem",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                >
                  {formation}
                </motion.div>
              ))}
            </div>

            <button
              onClick={() => setSelectedDepartement("")}
              style={{
                marginTop: "30px",
                padding: "10px 20px",
                background: "#f0f0f0",
                border: "1px solid #ccc",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              ⬅️ Retour au choix du département
            </button>
          </motion.div>
        )}

        {validated && (
          <motion.div
            key="validated"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 style={{ color: "green" }}>✅ Formation validée !</h2>
            <p>Vous allez être redirigé vers la page d’inscription...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FranceMap;
