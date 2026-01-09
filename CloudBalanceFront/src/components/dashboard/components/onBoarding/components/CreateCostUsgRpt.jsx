import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaCheckSquare } from "react-icons/fa";
import { MdOutlineRadioButtonChecked } from "react-icons/md";
import createCstUsg1 from "../../../../../assets/createCstUsg1.png";
import createCstUsg2 from "../../../../../assets/createCstUsg2.png";
import createCstUsg3 from "../../../../../assets/createCstUsg3.png";
function CreateCostUsgRpt() {
  const [copied, setCopied] = useState(false);
  const roleName = "ck-tuner-275595855473-hourly-cur";
  const pathfx = "275595855473";

  const handleCopy = () => {
    navigator.clipboard.writeText(roleName);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyfx = () => {
    navigator.clipboard.writeText(pathfx);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="mt-8">
      <div>
        <h2 className="text-lg font-semibold">Create Cost & Usage Report</h2>
        <p className="mt-2.5 text-gray-600">
          Create a Cost & Usage Report by following these steps
        </p>
      </div>

      <div className="bg-white p-3.5 mt-3.5">
        <div className="flex gap-3 items-start">
          <span className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-400 text-white font-semibold text-xs">
            1
          </span>
          <p className="text-gray-700 leading-relaxed">
            Go to{" "}
            <Link className="text-blue-600 hover:text-blue-800 underline" to="">
              Cost and Usage Reports
            </Link>{" "}
            in the Billing Dashboard and click on{" "}
            <span className="font-bold">Create report.</span>
          </p>
        </div>

        <div className="flex gap-3 items-start mt-4">
          <span className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-400 text-white font-semibold text-xs">
            2
          </span>
          <p className="text-gray-700 leading-relaxed">
            Name the report as shown below and select the{" "}
            <span className="font-semibold">Include resource IDs </span>
            checkbox -
          </p>
        </div>

        <div
          onClick={handleCopy}
          className="flex  mt-4 items-center gap-2 bg-gray-50 border border-gray-300 rounded p-3 hover:bg-blue-50 transition-colors cursor-pointer relative"
        >
          <svg
            className={`w-4 h-4 ${copied ? "text-green-500" : "text-blue-600"}`}
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

        <div className="flex gap-3 items-start mt-4">
          <p className="text-gray-700 leading-relaxed">
            Ensure that the following configuration is checked{" "}
            <span className="font-semibold flex items-center ml-9 gap-1.5">
              {" "}
              <FaCheckSquare />
              <p>Include Resource IDs </p>
              <br />
            </span>
            <span className="mt-4">
              Click on <span className="font-bold">Next</span>
            </span>
          </p>
        </div>
        <div className="flex gap-3 items-start mt-4">
          <div className="flex-1">
            <img
              src={createCstUsg1}
              alt="AWS IAM Role Summary"
              className="w-full border border-gray-300 rounded-lg shadow-sm"
            />
          </div>
        </div>

        <div className="flex gap-3 items-start mt-4">
          <span className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-400 text-white font-semibold text-xs">
            3
          </span>
          <p className="text-gray-700 leading-relaxed">
            In Configure S3 Bucket, provide the name of the S3 bucket that was
            created -
            <p className="text-gray-700 leading-relaxed mt-4">
              Ensure that the following configuration is checked{" "}
              <span className="font-semibold flex items-center ml-9 gap-1.5">
                {" "}
                <FaCheckSquare />
                <p>
                  The following default policy will be applied to your bucket{" "}
                </p>
                <br />
              </span>
              <span className="mt-4">
                Click on <span className="font-bold">Save</span>
              </span>
            </p>
          </p>
        </div>

        <div className="flex gap-3 items-start mt-4">
          <div className="flex-1">
            <img
              src={createCstUsg2}
              alt="AWS IAM Role Summary"
              className="w-full border border-gray-300 rounded-lg shadow-sm"
            />
          </div>
        </div>

        <div className="flex gap-3 items-start mt-4">
          <span className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-400 text-white font-semibold text-xs">
            4
          </span>
          <p className="text-gray-700 leading-relaxed">
            In the Delivery options section, enter the below-mentioned Report
            path prefix -<p className="mt-4 text-sm">Report path prefix:</p>
          </p>
        </div>

        <div
          onClick={handleCopyfx}
          className="flex ml-9 items-center gap-2 bg-gray-50 border border-gray-300 rounded p-3 hover:bg-blue-50 transition-colors cursor-pointer relative"
        >
          <svg
            className={`w-4 h-4 ${copied ? "text-green-500" : "text-blue-600"}`}
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
            {pathfx}
          </span>

          {copied && (
            <span className="text-xs font-sans text-green-600 font-medium animate-pulse">
              Copied!
            </span>
          )}
        </div>

        <div className="flex gap-3 items-start mt-4">
          <p className="text-gray-700  text-sm leading-relaxed">
            Additionally, ensure that the following checks are in place
            <p className="mt-4 text-sm">Time granularity:</p>
            <p className="flex items-center ml-9 gap-1.5">
              <MdOutlineRadioButtonChecked />
              <span className="font-bold">Hourly</span>
            </p>
            <p className="mt-4">
              Please make sure these checks are Enabled in Enable report data
              integration for:
            </p>
            <span className="flex items-center gap-1.5 ml-9">
              {" "}
              <FaCheckSquare /> <p className="font-bold">Amazon Athena</p>
            </span>
          </p>
        </div>

        <div className="flex gap-3 items-start mt-4">
          <div className="flex-1">
            <img
              src={createCstUsg3}
              alt="AWS IAM Role Summary"
              className="w-full border border-gray-300 rounded-lg shadow-sm"
            />
          </div>
        </div>

        <div className="flex gap-3 items-start mt-4">
          <span className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-400 text-white font-semibold text-xs">
            5
          </span>
          <p className="text-gray-700 leading-relaxed">
             Click on <span className="font-semibold">Next</span>. Now, review the configuration of the Cost and Usage Report. Once satisfied, click on Create Report.{" "}
            <span className="font-semibold">Create Report.</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CreateCostUsgRpt;
