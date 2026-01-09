import React from "react";
import imaroleimg from "../../../../../assets/imaroleimg.png";
import addCustPolic2 from "../../../../../assets/addCustPolic2.png";
import addCustPolic3 from "../../../../../assets/addCustPolic3.png";
import { Link } from "react-router-dom";
function AdCustManagPolicies() {
  return (
    <div className="mt-8">
      <div>
        <h2 className="text-lg font-semibold">Add Customer Managed Policies</h2>
        <p className="mt-2.5 text-gray-600">
          Create an Inline policy for the role by folowing these steps
        </p>
      </div>

      <div className="bg-white p-3.5 mt-3.5">
        <div className="flex gap-3 items-start">
          <span className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-400 text-white font-semibold text-xs">
            1
          </span>
          <p className="text-gray-700 leading-relaxed">
            Go to the &{" "}
            <Link className="text-blue-600 hover:text-blue-800 underline" to="">
              CK-Tuner-Role
            </Link>
          </p>
        </div>

        <div className="flex gap-3 items-start mt-4">
          <div className="flex-1">
            <img
              src={imaroleimg}
              alt="AWS IAM Role Summary"
              className="w-full border border-gray-300 rounded-lg shadow-sm"
            />
          </div>
        </div>

        <div className="flex gap-3 items-start mt-4">
          <span className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-400 text-white font-semibold text-xs">
            2
          </span>
          <p className="text-gray-700 leading-relaxed">
            In Permission policies, click on{" "}
            <span className="font-semibold">
              Add permissions {`>`} Attach Policy
            </span>
          </p>
        </div>

        <div className="flex gap-3 items-start mt-4">
          <div className="flex-1">
            <img
              src={addCustPolic2}
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
            In Permission policies, click on{" "}
            <span className="font-semibold">
              Add permissions {`>`} Attach Policy
            </span>
          </p>
        </div>

        <div className="flex gap-3 items-start mt-4">
          <div className="flex-1">
            <img
              src={addCustPolic3}
              alt="AWS IAM Role Summary"
              className="w-full border border-gray-300 rounded-lg shadow-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdCustManagPolicies;
