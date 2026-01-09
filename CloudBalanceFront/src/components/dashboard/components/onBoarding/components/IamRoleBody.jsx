import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import JsonDisplayBox from "./JsonDisplayBox";
import imaroleimg from "../../../../../assets/imaroleimg.png";
function IamRoleBody({
  arn,
  accountId,
  accountName,
  setArn,
  setAccountId,
  setAccountName
}) {
  const [copied, setCopied] = useState(false);

  const roleName = "CK-Tuner-Role-dev2";

  const handleCopy = () => {
    navigator.clipboard.writeText(roleName);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-8">
      <div>
        <h2 className="text-lg font-semibold">Create an IAM Role</h2>
        <p className="mt-2.5 text-gray-600">
          Create an IAM Role by following these steps
        </p>
      </div>

      <div className="bg-white p-3.5 mt-3.5">
        <div className="flex gap-3 items-start">
          <span className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-400 text-white font-semibold text-xs">
            1
          </span>
          <p className="text-gray-700 leading-relaxed">
            Log into AWS account &{" "}
            <Link className="text-blue-600 hover:text-blue-800 underline" to="">
              Create an IAM Role
            </Link>
          </p>
        </div>

        <div className="flex gap-3 items-start mt-4">
          <span className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-400 text-white font-semibold text-xs">
            2
          </span>
          <div className="flex-1">
            <p className="text-gray-700 leading-relaxed mb-3">
              In the{" "}
              <span className="font-medium italic">Trusted entity type</span>{" "}
              section, select{" "}
              <span className="font-semibold">Custom trust policy</span>.
              Replace the prefilled policy with the policy provided below -
            </p>
            <JsonDisplayBox />
          </div>
        </div>

        <div className="flex gap-3 items-start mt-4">
          <span className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-400 text-white font-semibold text-xs">
            3
          </span>
          <p className="text-gray-700 leading-relaxed">
            Click on <span className="font-semibold">Next</span> to go to the{" "}
            <span className="font-medium italic">Add permissions page</span>. We
            would not be adding any permissions for now because the permission
            policy content will be dependent on the AWS Account ID retrieved
            from the IAM Role. Click on{" "}
            <span className="font-semibold">Next</span>.
          </p>
        </div>

        <div className="flex gap-3 items-start mt-4">
          <span className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-400 text-white font-semibold text-xs">
            4
          </span>
          <div className="flex-1">
            <p className="text-gray-700 leading-relaxed mb-3">
              In the <span className="font-medium italic">Role name field</span>
              , enter the below-mentioned role name, and click on{" "}
              <span className="font-semibold">Create Role</span> -
            </p>

            {/* Role Name Input Box*/}
            <div
              onClick={handleCopy}
              className="flex items-center gap-2 bg-gray-50 border border-gray-300 rounded p-3 hover:bg-blue-50 transition-colors cursor-pointer relative"
            >
              <svg
                className={`w-4 h-4 ${
                  copied ? "text-green-500" : "text-blue-600"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm text-gray-800 font-mono flex-1">
                {roleName}
              </span>

              {copied && (
                <span className="text-xs font-sans text-green-600 font-medium animate-pulse">
                  Copied!
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-3 items-start mt-4">
          <span className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-400 text-white font-semibold text-xs">
            5
          </span>
          <div className="flex-1">
            <p className="text-gray-700 leading-relaxed mb-3">
              Go to the newly create IAM Role and copy the Role ARN -
            </p>

            <img
              src={imaroleimg}
              alt="AWS IAM Role Summary"
              className="w-full border border-gray-300 rounded-lg shadow-sm"
            />
          </div>
        </div>

        <div className="flex gap-3 items-start mt-4">
          <span className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-400 text-white font-semibold text-xs">
            6
          </span>
          <div className="flex-1">
            <p className="text-gray-700 leading-relaxed mb-3">
              Paste the copied Role ARN below -
            </p>

           
            {/* Input Fields */}
            <div className="flex items-end justify-between gap-6">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Enter the IAM Role ARN <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={arn}
                  onChange={(e) => setArn(e.target.value)}
                  placeholder="Enter the IAM Role ARN"
                  className="w-72 px-3 py-2 border border-gray-300 rounded
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Account ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={accountId}
                  onChange={(e) => setAccountId(e.target.value)}
                  placeholder="Enter Account ID"
                  className="w-72 px-3 py-2 border border-gray-300 rounded
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Account Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  placeholder="Enter Account Name"
                  className="w-72 px-3 py-2 border border-gray-300 rounded
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IamRoleBody;
