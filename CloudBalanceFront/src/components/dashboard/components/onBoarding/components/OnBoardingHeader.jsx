import React from "react";
function OnBoardingHeader({ currentStep }) {
  const steps = [
    { id: 1, label: "A. Create an IAM Role" },
    { id: 2, label: "B. Add Customer Managed Policies" },
    { id: 3, label: "C. Create CUR" },
  ];

  return (
    <div className="bg-white p-4 shadow-sm">
      <div className="inline-block rounded-md bg-gray-300 px-2 py-2 mb-6">
        <h3 className="text-md font-semibold">Recommendations</h3>
      </div>

      <div className="flex items-center gap-6 flex-wrap">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center gap-2">
            <svg
              className={`w-5 h-5 ${
                currentStep >= step.id ? "text-green-500" : "text-gray-400"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <h4
              className={`text-sm font-medium ${
                currentStep === step.id ? "text-blue-800 underline" : "text-gray-700"
              }`}
            >
              {step.label}
            </h4>
            {index < steps.length - 1 && (
              <svg
                className="w-4 h-4 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


export default OnBoardingHeader;
