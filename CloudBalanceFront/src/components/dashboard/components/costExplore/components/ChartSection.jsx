import { useState, useEffect } from "react";
import CostExplorerControls from "./CostExplorerControls";
import UnifiedChart from "./UnifiedChart";
import FilterCost from "./FilterCost";
import { transformCostExplorerApiResponse } from "./chartData";
import { getCostExplorerGroup } from "../../../../../api/costExplorerApi";
import { useContext } from "react";
import { AccountContext } from "../../../../../context/AccountContext";

function ChartSection({
  activeGroup,
  onGroupChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
  appliedFilters,
  onApplyFilters,
}) {
  const [chartType, setChartType] = useState("bar");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { selectedAccountId } = useContext(AccountContext);

  // Helper function to convert "Jan 2025" to "2025-01"
  const convertDateToApiFormat = (dateString) => {
    const monthMap = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };

    const [month, year] = dateString.split(" ");
    return `${year}-${monthMap[month]}`;
  };

  // Helper function to convert group name to API column name
  const getGroupByColumn = (groupName) => {
    const groupMap = {
      //primary operation
      Service: "SERVICE",
      Region: "REGION",
      "Account ID": "ACCOUNT_ID",
      "Instance Type": "INSTANCE_TYPE",
      "Usage Type": "USAGE_TYPE",
      Platform: "PLATFORM",
      "Purchase Option": "PURCHASE_OPTION",
      "API Operation": "API_OPERATION",
      Resource: "RESOURCE",
      "Usage Type Group": "USAGE_TYPE_GROUP",
      "Availability Zone": "AVAILABILITY_ZONE",
      Tenancy: "TENANCY",
      "Legal Entity": "LEGAL_ENTITY",
      "Billing Entity": "BILLING_ENTITY",
    };

    return groupMap[groupName] || "SERVICE";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

          const finalFilters = {
        ...appliedFilters,
        ...(selectedAccountId
          ? { ACCOUNT_ID: [selectedAccountId] }
          : {}),
      };
        const groupByColumn = getGroupByColumn(activeGroup);
        const startMonth = convertDateToApiFormat(startDate);
        const endMonth = convertDateToApiFormat(endDate);

        const response = await getCostExplorerGroup(
          groupByColumn,
          startMonth,
          endMonth,
          finalFilters
        );

        // Transform API response to chart format
        const transformedData = transformCostExplorerApiResponse(response.data);
        setChartData(transformedData);
      } catch (error) {
        console.error("Error fetching chart data:", error);
        setError("Failed to load chart data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeGroup, startDate, endDate, appliedFilters, selectedAccountId]);

  const toggleFilter = () => {
    setIsFilterOpen((prev) => !prev);
  };

  return (
    <div className="w-full bg-gray-100 px-6 pt-6 pb-2">
      <CostExplorerControls
        onChartTypeChange={setChartType}
        activeChartType={chartType}
        onFilterClick={toggleFilter}
        activeGroup={activeGroup}
        onGroupChange={onGroupChange}
        startDate={startDate}
        onStartDateChange={onStartDateChange}
        endDate={endDate}
        onEndDateChange={onEndDateChange}
      />

      
      <div className="mt-4 bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
        <div className="flex h-[480px] transition-all duration-300">
        
          <div
            className={`transition-all duration-300 ${
              isFilterOpen ? "w-[calc(100%-320px)]" : "w-full"
            }`}
          >
            <div className="w-full h-full p-3 bg-white">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-blur-800">Loading chart data...</div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-red-500">{error}</div>
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

        
          <div
            className={`transition-all duration-300 overflow-hidden ${
              isFilterOpen ? "w-[320px]" : "w-0"
            }`}
          >
            <FilterCost
              onClose={() => setIsFilterOpen(false)}
              onApplyFilters={onApplyFilters}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChartSection;
