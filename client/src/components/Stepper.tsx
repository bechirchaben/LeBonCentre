import React from "react";

const Stepper = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="flex justify-center mb-8">
      <ol className="flex items-center w-full max-w-md text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        {[1, 2, 3].map((step) => (
          <li
            key={step}
            className={`flex-1 inline-flex items-center justify-center px-4 py-2 ${
              currentStep === step
                ? "text-blue-600 font-bold bg-blue-50"
                : "border-r"
            }`}
          >
            Étape {step}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Stepper;
