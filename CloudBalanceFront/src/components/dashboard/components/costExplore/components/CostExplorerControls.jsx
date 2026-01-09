import { useState } from "react";
import {
  FiFilter,
  FiBarChart2,
  FiTrendingUp,
  FiGrid,
} from "react-icons/fi";

const groupOptions = [
  "Service",
  "Instance Type",
  "Account ID",
  "Usage Type",
  "Platform",
  "Region",
  "Usage Type Group",
];

const months = [
  "Jan 2025", "Feb 2025", "Mar 2025", "Apr 2025",
  "May 2025", "Jun 2025", "Jul 2025", "Aug 2025",
  "Sep 2025", "Oct 2025", "Nov 2025", "Dec 2025",
];

function CostExplorerControls({ onChartTypeChange, activeChartType, onFilterClick }) {
  const [activeGroup, setActiveGroup] = useState("Service");
  const [startDate, setStartDate] = useState("Jun 2025");
  const [endDate, setEndDate] = useState("Nov 2025");

  return (
    <div className="bg-white border border-gray-200 rounded-md p-4">
      {/* GROUP BY ROW */}
      <div className="flex items-center justify-between mb-4 gap-4">
        {/* LEFT SIDE */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-gray-600">
            Group By:
          </span>

          {groupOptions.map((item) => (
            <button
              key={item}
              onClick={() => setActiveGroup(item)}
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
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white
            hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">More</option>
            <option>Purchase Option</option>
            <option>API Operation</option>
            <option>Resource</option>
            <option>Charge Type</option>
            <option>Availability Zone</option>
            <option>Tenancy</option>
            <option>Legal Entity</option>
            <option>Billing Entity</option>
          </select>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2">
          {/* START DATE */}
          <select
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white
            focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {months.map((month) => (
              <option key={month}>{month}</option>
            ))}
          </select>

          <span className="text-gray-400 text-sm">to</span>

          {/* END DATE */}
          <select
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white
            focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {months.map((month) => (
              <option key={month}>{month}</option>
            ))}
          </select>

          {/* FILTER BUTTON */}
          <button 
            onClick={onFilterClick}
            className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
          >
            <FiFilter className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* COST + CHART ICONS */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-600">
          Costs ($)
        </span>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => onChartTypeChange('bar')}
            className={`p-2 border rounded-md transition-colors
              ${activeChartType === 'bar' 
                ? 'bg-blue-800 text-white border-blue-800' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            title="Bar Chart"
          >
            <FiBarChart2 />
          </button>
          <button 
            onClick={() => onChartTypeChange('line')}
            className={`p-2 border rounded-md transition-colors
              ${activeChartType === 'line' 
                ? 'bg-blue-800 text-white border-blue-800' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            title="Line Chart"
          >
            <FiTrendingUp />
          </button>
          <button 
            onClick={() => onChartTypeChange('stack')}
            className={`p-2 border rounded-md transition-colors
              ${activeChartType === 'stack' 
                ? 'bg-blue-800 text-white border-blue-800' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
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