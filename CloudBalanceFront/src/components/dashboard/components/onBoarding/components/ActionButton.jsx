import React from "react";

function ActionButton({
  onCancel,
  onBack,
  onNext,
  nextDisabled = false,
  showBack = true,
  isLastStep = false,
  isSecondStep = false,
  loading = false,
}) {
  return (
    <div className="w-full border-t bg-gray-50 px-6 py-4 flex items-center justify-between">
      <button
        onClick={onCancel}
        disabled={loading}
        className="px-4 py-2 text-sm font-medium border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Cancel
      </button>

      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={onBack}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>
        )}

        <button
          onClick={onNext}
          disabled={nextDisabled || loading}
          className={`px-5 py-2 text-sm font-medium rounded-md transition flex items-center gap-2 ${
            nextDisabled || loading
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-800 text-white hover:bg-blue-700"
          }`}
        >
          {loading && (
            <svg
              className="animate-spin h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          {loading
            ? "Saving..."
            : isLastStep
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