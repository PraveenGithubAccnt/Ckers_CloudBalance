import { NavLink } from "react-router-dom";
import { FaUserFriends, FaRocket, FaChartArea, FaAws } from "react-icons/fa";

function SideMenuSlider({ open }) {
  return (
    <div
      className={`h-screen bg-white border-r transition-all duration-300
      ${open ? "w-64" : "w-20"}`}
    >
      <ul className="p-4 space-y-6">
        <li>
          <NavLink
            to="/dashboard/users"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-md 
               transition-all duration-300
               ${
                 isActive
                   ? "bg-blue-500 text-white"
                   : "text-gray-700 hover:bg-gray-200"
               }`
            }
          >
            <FaUserFriends size={20} />

            <span
              className={`transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap
    ${open ? "opacity-100 max-w-[200px] ml-2" : "opacity-0 max-w-0 ml-0"}`}
            >
              User Management
            </span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/dashboard/onboarding"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-md 
              transition-all duration-300
              ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            <FaRocket size={20} />
            <span
              className={`transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap
    ${open ? "opacity-100 max-w-[200px] ml-2" : "opacity-0 max-w-0 ml-0"}`}
            >
              Onboarding
            </span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/dashboard/costexplorer"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-md 
              transition-all duration-300
              ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            <FaChartArea size={20} />
            <span
              className={`transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap
    ${open ? "opacity-100 max-w-[200px] ml-2" : "opacity-0 max-w-0 ml-0"}`}
            >
              Cost Explorer
            </span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/dashboard/awsservices"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-md 
              transition-all duration-300
              ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            <FaAws size={28} />
            <span
              className={`transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap
    ${open ? "opacity-100 max-w-[200px] ml-2" : "opacity-0 max-w-0 ml-0"}`}
            >
              AWS Services
            </span>
          </NavLink>
        </li>

      </ul>
    </div>
  );
}

export default SideMenuSlider;
