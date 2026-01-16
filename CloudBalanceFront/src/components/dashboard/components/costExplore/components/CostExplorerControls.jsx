import { FiFilter, FiBarChart2, FiTrendingUp, FiGrid } from "react-icons/fi";
import MonthYearPicker from "./MonthYearPicker";
import { useSelector } from "react-redux"; 

const groupOptions = [
  "Service",
  "Instance Type",
  "Account ID",
  "Usage Type",
  "Platform",
  "Region",
];

const moreOptions = [
  "Purchase Option",
  "API Operation",
  "Resource",
  "Usage Type Group",
  "Availability Zone",
  "Tenancy",
  "Legal Entity",
  "Billing Entity"
];

function CostExplorerControls({
  onChartTypeChange,
  activeChartType,
  onFilterClick,
  activeGroup,
  onGroupChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
}) {

  // Get role from Redux 
  const { role } = useSelector((state) => state.auth);
  const isCustomer = role === "customer";
  
  // Check if activeGroup is in moreOptions
  const isMoreOptionSelected = moreOptions.includes(activeGroup);
  
  const handleMoreOptionChange = (e) => {
    const value = e.target.value;
    if (value) {
      onGroupChange(value);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-md p-4">
      <div className="flex items-center justify-between mb-4 gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-gray-600">Group By:</span>

          {groupOptions
            .filter((item) => !(isCustomer && item === "Account ID"))
            .map((item) => (
              <button
                key={item}
                onClick={() => onGroupChange(item)}
                className={`px-3 py-1.5 text-sm rounded-md border transition-colors
                  ${
                    activeGroup === item
                      ? "bg-blue-800 text-white border-blue-800"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
              >
                {item}
              </button>
            ))}

          <select
            value={isMoreOptionSelected ? activeGroup : ""}
            onChange={handleMoreOptionChange}
            className={`px-3 py-1.5 text-sm border rounded-md transition-colors
              ${
                isMoreOptionSelected
                  ? "bg-white  text-blue-800 border-blue-800"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }
              focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="">More</option>
            {moreOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">

          <MonthYearPicker value={startDate} onChange={onStartDateChange} />

          <span className="text-gray-400 text-sm">to</span>

          <MonthYearPicker value={endDate} onChange={onEndDateChange} />

          <button
            onClick={onFilterClick}
            className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
          >
            <FiFilter className="text-gray-600" />
          </button>
        </div>
      </div>

  
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-600">Costs ($)</span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onChartTypeChange("bar")}
            className={`p-2 border rounded-md transition-colors
              ${
                activeChartType === "bar"
                  ? "bg-blue-800 text-white border-blue-800"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            title="Bar Chart"
          >
            <FiBarChart2 />
          </button>
          <button
            onClick={() => onChartTypeChange("line")}
            className={`p-2 border rounded-md transition-colors
              ${
                activeChartType === "line"
                  ? "bg-blue-800 text-white border-blue-800"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            title="Line Chart"
          >
            <FiTrendingUp />
          </button>
          <button
            onClick={() => onChartTypeChange("stack")}
            className={`p-2 border rounded-md transition-colors
              ${
                activeChartType === "stack"
                  ? "bg-blue-800 text-white border-blue-800"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            title="Stack Chart"
          >
            <FiGrid />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CostExplorerControls;