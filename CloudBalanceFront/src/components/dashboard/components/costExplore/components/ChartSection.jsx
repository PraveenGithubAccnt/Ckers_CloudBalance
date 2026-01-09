import { useState, useEffect } from "react";
import CostExplorerControls from "./CostExplorerControls";
import UnifiedChart from "./UnifiedChart";
import FilterCost from "./FilterCost";
import { apiResponseData } from "./chartData";

function ChartSection() {
  const [chartType, setChartType] = useState("bar");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // In real scenario, replace this with:
        // const response = await fetch('your-api-endpoint');
        // const data = await response.json();
        
        setChartData(apiResponseData);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleFilter = () => {
    setIsFilterOpen(prev => !prev);
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
            <div className="w-full h-full p-3 bg-white">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-gray-500">Loading chart data...</div>
                </div>
              ) : chartData ? (
                <UnifiedChart chartType={chartType} data={chartData} />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-gray-500">No data available</div>
                </div>
              )}
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
