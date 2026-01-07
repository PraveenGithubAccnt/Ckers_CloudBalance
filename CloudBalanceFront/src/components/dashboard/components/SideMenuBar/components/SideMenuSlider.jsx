import { NavLink } from "react-router-dom";
import { FaUserFriends, FaRocket, FaChartArea, FaAws } from "react-icons/fa";
import { useContext } from "react";
import { SideBarOpentShut } from "../../../ContextHolder";
function SideMenuSlider() {
    const {open}=useContext(SideBarOpentShut); 
  const SideBarItems = [
    {
      to: "/dashboard/users",
      label: "User Management",
      icon: <FaUserFriends size={20} />,
    },
    {
      to: "/dashboard/onboarding",
      label: "Onboarding",
      icon: <FaRocket size={20} />,
    },
    {
      to: "/dashboard/costexplorer",
      label: "Cost Explorer",
      icon: <FaChartArea size={20} />,
    },
    {
      to: "/dashboard/awsservices",
      label: "AWS Services",
      icon: <FaAws size={28} />,
    },
  ];

  return (
    <div
      className={`h-screen bg-white border-r transition-all duration-300
      ${open ? "w-64" : "w-20"}`}
    >
      <ul className="p-4 space-y-6">
        {SideBarItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-md transition-all duration-300
                ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`
              }
            >
              {item.icon}

              <span
                className={`transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap
                ${open? "opacity-100 max-w-[200px] ml-2": "opacity-0 max-w-0 ml-0"}`}
              >
                {item.label}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideMenuSlider;
