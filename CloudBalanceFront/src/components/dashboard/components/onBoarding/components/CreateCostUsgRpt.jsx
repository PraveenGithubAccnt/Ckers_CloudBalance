import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaCheckSquare } from "react-icons/fa";
import { MdOutlineRadioButtonChecked } from "react-icons/md";
import createCstUsg1 from "../../../../../assets/createCstUsg1.png";
import createCstUsg2 from "../../../../../assets/createCstUsg2.png";
import createCstUsg3 from "../../../../../assets/createCstUsg3.png";

function CreateCostUsgRpt() {
  const [copied, setCopied] = useState(false);
  const roleName = "ck-tuner-275595855473-hourly-cur";
  const pathfx = "275595855473";

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
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
          <span className="shrink-0 w-6 h-6 rounded-full bg-blue-400 text-white flex items-center justify-center text-xs font-semibold">
            1
          </span>
          <p className="text-gray-700 leading-relaxed">
            Go to{" "}
            <Link className="text-blue-600 underline" to="">
              Cost and Usage Reports
            </Link>{" "}
            in the Billing Dashboard and click on{" "}
            <span className="font-bold">Create report</span>.
          </p>
        </div>

     
        <div className="flex gap-3 items-start mt-4">
          <span className="shrink-0 w-6 h-6 rounded-full bg-blue-400 text-white flex items-center justify-center text-xs font-semibold">
            2
          </span>
          <p className="text-gray-700 leading-relaxed">
            Name the report as shown below and select the{" "}
            <span className="font-semibold">Include resource IDs</span> checkbox.
          </p>
        </div>

       
        <div
          onClick={() => handleCopy(roleName)}
          className="flex mt-4 items-center gap-2 bg-gray-50 border border-gray-300 rounded p-3 cursor-pointer"
        >
          <span className="text-sm font-mono flex-1">{roleName}</span>
          {copied && (
            <span className="text-xs text-green-600 font-medium">Copied!</span>
          )}
        </div>

       
        <div className="mt-4 text-gray-700">
          <p>Ensure that the following configuration is checked:</p>

          <div className="flex items-center gap-2 ml-9 mt-2 font-semibold">
            <FaCheckSquare />
            <span>Include Resource IDs</span>
          </div>

          <p className="mt-4">
            Click on <span className="font-bold">Next</span>
          </p>
        </div>

        <img
          src={createCstUsg1}
          alt="Step 2"
          className="w-full mt-4 border rounded-lg"
        />

    
        <div className="flex gap-3 items-start mt-6">
          <span className="shrink-0 w-6 h-6 rounded-full bg-blue-400 text-white flex items-center justify-center text-xs font-semibold">
            3
          </span>
          <div className="text-gray-700 leading-relaxed">
            <p>
              In Configure S3 Bucket, provide the name of the S3 bucket that was
              created.
            </p>

            <div className="flex items-center gap-2 ml-9 mt-2 font-semibold">
              <FaCheckSquare />
              <span>
                The following default policy will be applied to your bucket
              </span>
            </div>

            <p className="mt-4">
              Click on <span className="font-bold">Save</span>
            </p>
          </div>
        </div>

        <img
          src={createCstUsg2}
          alt="Step 3"
          className="w-full mt-4 border rounded-lg"
        />

        
        <div className="flex gap-3 items-start mt-6">
          <span className="shrink-0 w-6 h-6 rounded-full bg-blue-400 text-white flex items-center justify-center text-xs font-semibold">
            4
          </span>
          <div className="text-gray-700">
            <p>Enter the report path prefix:</p>
            <p className="mt-2 text-sm">Report path prefix</p>
          </div>
        </div>

        <div
          onClick={() => handleCopy(pathfx)}
          className="flex ml-9 mt-2 items-center gap-2 bg-gray-50 border border-gray-300 rounded p-3 cursor-pointer"
        >
          <span className="text-sm font-mono flex-1">{pathfx}</span>
          {copied && (
            <span className="text-xs text-green-600 font-medium">Copied!</span>
          )}
        </div>

       
        <div className="mt-6 text-gray-700 text-sm">
          <p>Additionally, ensure the following:</p>

          <p className="mt-4">Time granularity:</p>
          <div className="flex items-center gap-2 ml-9 font-bold">
            <MdOutlineRadioButtonChecked />
            Hourly
          </div>

          <p className="mt-4">Enable report data integration for:</p>
          <div className="flex items-center gap-2 ml-9 font-bold">
            <FaCheckSquare />
            Amazon Athena
          </div>
        </div>

        <img
          src={createCstUsg3}
          alt="Step 4"
          className="w-full mt-4 border rounded-lg"
        />

       
        <div className="flex gap-3 items-start mt-6">
          <span className="shrink-0 w-6 h-6 rounded-full bg-blue-400 text-white flex items-center justify-center text-xs font-semibold">
            5
          </span>
          <p className="text-gray-700 leading-relaxed">
            Review the configuration and click{" "}
            <span className="font-semibold">Create Report</span>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CreateCostUsgRpt;
