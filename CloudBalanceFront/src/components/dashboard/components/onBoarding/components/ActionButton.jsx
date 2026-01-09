import React from "react";

function ActionButton({
  onCancel,
  onBack,
  onNext,
  nextDisabled = false,
  showBack = true,
  isLastStep = false,
  isSecondStep = false,
}) {
  return (
    <div className="w-full border-t bg-gray-50 px-6 py-4 flex items-center justify-between">
      <button
        onClick={onCancel}
        className="px-4 py-2 text-sm font-medium border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition"
      >
        Cancel
      </button>

      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={onBack}
            className="px-4 py-2 text-sm font-medium border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition"
          >
            Back
          </button>
        )}

        <button
          onClick={onNext}
          disabled={nextDisabled}
          className={`px-5 py-2 text-sm font-medium rounded-md transition ${
            nextDisabled
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-800 text-white hover:bg-blue-700"
          }`}
        >
          {isLastStep
            ? "Submit"
            : isSecondStep
            ? "Next – Create CUR"
            : "Next – Add Customer Managed Policies"}
        </button>
      </div>
    </div>
  );
}

export default ActionButton;
