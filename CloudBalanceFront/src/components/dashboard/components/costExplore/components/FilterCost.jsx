import { useState } from "react";
import { LuTimerReset } from "react-icons/lu";

function FilterCost() {
  // Store selected filters
  const [selectedFilters, setSelectedFilters] = useState([]);

  const filters = [
    "Service",
    "Instance Type",
    "Account ID",
    "Usage Type",
    "Platform",
    "Region",
    "Usage Type Group",
    "Purchase Option",
    "API Operation",
    "Resource",
    "Charge Type",
    "Availability Zone",
    "Tenancy",
    "Legal Entity",
    "Billing Entity",
  ];



 
  const handleCheckboxChange = (filter) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((item) => item !== filter)
        : [...prev, filter]
    );
  };

  // Reset all filters
  const handleReset = () => {
    setSelectedFilters([]);
  };

  return (
    <div className="h-full w-[320px] bg-white border border-gray-300 rounded-r-md shadow-xl flex flex-col">
      
      {/* HEADER */}
      <div className="flex items-center justify-between p-4 border-b bg-white rounded-tr-md">
        <h3 className="text-sm font-semibold">Filters</h3>

        <button
          onClick={handleReset}
          className="text-sm text-blue-500 hover:text-blue-700 font-medium flex items-center gap-1"
        >
          <span>Reset All</span>
          <LuTimerReset />
        </button>
      </div>

      {/* FILTER LIST */}
      <div className="p-4 space-y-3 overflow-y-auto flex-1 bg-white">
        {filters.map((item) => (
          <label
            key={item}
            className="flex items-center justify-between text-gray-700 text-sm cursor-pointer hover:bg-gray-50 p-2 rounded"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 cursor-pointer"
                checked={selectedFilters.includes(item)}
                onChange={() => handleCheckboxChange(item)}
              />
              {item}
            </div>
            <span className="text-xs text-gray-400">Include Only</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default FilterCost;
