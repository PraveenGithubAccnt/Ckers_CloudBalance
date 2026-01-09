import { useState } from "react";

function EcAsgRds({ onChange }) {
  const [activeTab, setActiveTab] = useState("EC2");

  const tabs = ["EC2", "ASG", "RDS"];

  const handleClick = (tab) => {
    setActiveTab(tab);
    onChange && onChange(tab);
  };

  return (
    <div className="inline-flex border rounded-sm overflow-hidden bg-white">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => handleClick(tab)}
          className={`px-6 py-2 text-sm font-medium border-r last:border-r-0
            ${
              activeTab === tab
                ? "bg-blue-800 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default EcAsgRds;
