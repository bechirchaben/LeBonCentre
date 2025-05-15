import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./FormationCards.css"; // Optionnel si tu préfères déplacer les styles dans un fichier CSS

const formations = ["VTC", "TAXI", "PERMIS C", "PERMIS B", "Moniteur Auto-école"];

const FormationCards = ({ selectedRegion, onBack, onValidate }) => {
  const [selectedFormation, setSelectedFormation] = useState("");

  const handleCardClick = (formation) => {
    setSelectedFormation(formation);
    setTimeout(() => {
      onValidate(formation); // validation automatique
    }, 300);
  };

  return (
    <motion.div
      key="form"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <h2 style={{ color: "#0077cc" }}>Région sélectionnée : {selectedRegion}</h2>
      <h3 style={{ marginTop: "30px" }}>Choisir la formation :</h3>

      <div className="card-container">
        {formations.map((formation) => (
          <motion.div
            className={`card ${selectedFormation === formation ? "selected" : ""}`}
            key={formation}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleCardClick(formation)}
          >
            {formation}
          </motion.div>
        ))}
      </div>

      <button
        onClick={onBack}
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
  );
};

export default FormationCards;
