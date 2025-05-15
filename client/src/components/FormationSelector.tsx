import React from "react";

const FormationSelector = ({
  region,
  departement,
  formations,
  onValidate,
  onBack,
}: {
  region: string;
  departement: string;
  formations: string[];
  onValidate: (f: string) => void;
  onBack: () => void;
}) => {
  return (
    <>
      <h2 style={{ color: "#0077cc" }}>
        Département : {departement} ({region})
      </h2>
      <h3 className="mt-8">Choisir la formation :</h3>

      <div className="flex flex-wrap justify-center gap-5 mt-5">
        {formations.map((formation) => (
          <div
            key={formation}
            onClick={() => onValidate(formation)}
            className="w-[200px] h-[100px] bg-white rounded-lg shadow-md flex items-center justify-center font-medium cursor-pointer hover:scale-105 transition"
          >
            {formation}
          </div>
        ))}
      </div>

      <button
        onClick={onBack}
        className="mt-8 px-5 py-2 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200"
      >
        Retour au choix du département
      </button>
    </>
  );
};

export default FormationSelector;
