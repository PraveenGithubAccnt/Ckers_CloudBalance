import { useState } from "react";

function JsonDisplayBox() {
  const [copied, setCopied] = useState(false);

  const jsonData = {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": {
          "AWS": "arn:aws:iam::951485052809:role/ck-tuner-nonprod-transitive-role"
        },
        "Action": "sts:AssumeRole",
        "Condition": {
          "StringEquals": {
            "sts:ExternalId": "MU1HX0RFRkFVTFQwMzM5NTZlYS1kMDE3LTRjYmQtYjY3ZS1jMGI4NWJjY2U4Yzk="
          }
        }
      },
      {
        "Effect": "Allow",
        "Principal": {
          "Service": "s3.amazonaws.com"
        },
        "Action": "sts:AssumeRole"
      }
    ]
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="relative group">
      <div className="bg-white hover:bg-blue-50 transition-colors duration-200 p-4 rounded border border-gray-300 max-h-64 overflow-y-auto">
        <pre className="text-sm text-gray-800 font-mono whitespace-pre">
          {JSON.stringify(jsonData, null, 2)}
        </pre>
      </div>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 bg-white border border-blue-600 hover:bg-blue-600 hover:text-white text-blue-600 rounded transition-colors"
        title="Copy to clipboard"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </button>
      {copied && (
        <div className="absolute top-2 right-12 bg-green-500 text-white text-xs px-2 py-1 rounded">
          Copied!
        </div>
      )}
    </div>
  );
}

export default JsonDisplayBox;