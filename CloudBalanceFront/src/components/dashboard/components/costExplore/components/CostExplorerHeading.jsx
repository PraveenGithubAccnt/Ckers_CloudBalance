import { MdOutlineHome } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

function CostExplorerHeading() {
  return (
    <div className="w-full px-6 py-4 bg-gray-100 border-b border-gray-200">
      

      <div className="flex items-center text-sm gap-2 mb-3">
        
      
        <NavLink
          to="/dashboard/users"
          end
          className={({ isActive }) =>
            `text-lg ${
              isActive ? "text-blue-600" : "text-gray-500"
            } hover:text-blue-600`
          }
        >
          <MdOutlineHome />
        </NavLink>

        <IoIosArrowForward className="text-xs text-gray-400" />


        <NavLink
          to=""
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-medium"
              : "text-gray-500 hover:text-gray-700"
          }
        >
          Cost Analysis
        </NavLink>

        <IoIosArrowForward className="text-xs text-gray-400" />

        <NavLink
          to=""
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-medium"
              : "text-gray-700"
          }
        >
          Cost Explorer
        </NavLink>
      </div>

    
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Cost Explorer
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            How to always be aware of cost changes and history.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CostExplorerHeading;
