import { useState } from "react";
import CostExplorerControls from "./CostExplorerControls";
import CostBarChart from "./CostBarChart";
import CostLineChart from "./CostLineChart";
import CostStckChart from "./CostStackChart";
import FilterCost from "./FilterCost";

function ChartSection() {
  const [chartType, setChartType] = useState("bar");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen(prev => !prev);
  };

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return <CostBarChart />;
      case "line":
        return <CostLineChart />;
      case "stack":
        return <CostStckChart />;
      default:
        return <CostBarChart />;
    }
  };

  return (
    <div className="w-full bg-gray-100 px-6 pt-6 pb-2">
      
  
      <CostExplorerControls
        onChartTypeChange={setChartType}
        activeChartType={chartType}
        onFilterClick={toggleFilter}
      />

      {/* CHART CARD */}
      <div className="mt-4 bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
        
        {/* FLEX CONTAINER */}
        <div className="flex h-[480px] transition-all duration-300">

          {/* Chart section */}
          <div
            className={`transition-all duration-300 ${
              isFilterOpen ? "w-[calc(100%-320px)]" : "w-full"
            }`}
          >
            <div className="w-full h-full p-3">
              {renderChart()}
            </div>
          </div>

          {/* FILTER PANEL */}
          <div
            className={`transition-all duration-300 overflow-hidden ${
              isFilterOpen ? "w-[320px]" : "w-0"
            }`}
          >
            <FilterCost onClose={() => setIsFilterOpen(false)} />
          </div>

        </div>
      </div>
    </div>
  );
}

export default ChartSection;
