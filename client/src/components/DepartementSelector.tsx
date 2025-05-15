import React from "react";

const DepartementSelector = ({
  region,
  departements,
  onSelect,
  onBack,
}: {
  region: string;
  departements: string[];
  onSelect: (d: string) => void;
  onBack: () => void;
}) => {
  return (
    <>
      <h2 style={{ color: "#0077cc" }}>Région sélectionnée : {region}</h2>
      <h3 className="mt-8">Choisir un département :</h3>

      <div className="mt-4 flex flex-wrap justify-center gap-4">
        {departements.map((dept) => (
          <div
            key={dept}
            onClick={() => onSelect(dept)}
            className="w-[200px] h-[80px] bg-white rounded-lg shadow-md flex items-center justify-center text-base cursor-pointer hover:scale-105 transition"
          >
            {dept}
          </div>
        ))}
      </div>

      <button
        onClick={onBack}
        className="mt-8 px-5 py-2 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200"
      >
        Retour à la carte
      </button>
    </>
  );
};

export default DepartementSelector;
