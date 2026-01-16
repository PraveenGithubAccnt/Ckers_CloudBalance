import { useState, useEffect } from "react";
import { LuTimerReset } from "react-icons/lu";
import { getFilterOption } from "../../../../../api/costExplorerApi";
import { useSelector } from "react-redux";

function FilterCost({ onApplyFilters, onClose }) {
  const [openFilter, setOpenFilter] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [filterOptions, setFilterOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { role } = useSelector((state) => state.auth);
  const isCustomer = role === "customer";

  // Fetch filter options
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getFilterOption();
        const transformed = transformFilterData(response.data);
        setFilterOptions(transformed);
      } catch (err) {
        console.error("Error fetching filter options:", err);
        setError("Failed to load filter options");
      } finally {
        setLoading(false);
      }
    };

    fetchFilterOptions();
  }, []);

  // Transform backend response
  const transformFilterData = (backendData) => {
    const filterNameMap = {
      SERVICE: "Service",
      INSTANCE_TYPE: "Instance Type",
      ACCOUNT_ID: "Account Id",
      USAGE_TYPE: "Usage Type",
      PLATFORM: "Platform",
      REGION: "Region",
      PURCHASE_OPTION: "Purchase Option",
      API_OPERATION: "API Operation",
      USAGE_TYPE_GROUP: "Usage Type Group",
      AVAILABILITY_ZONE: "Availability Zone",
      TENANCY: "Tenancy",
      LEGAL_ENTITY: "Legal Entity",
      BILLING_ENTITY: "Billing Entity",
    };

    return Object.entries(backendData).map(([key, options]) => ({
      name: filterNameMap[key] || key,
      value: key,
      options: options || [],
    }));
  };

  // Handle checkbox toggle
  const handleCheck = (filterKey, option) => {
    setSelectedFilters((prev) => {
      const current = prev[filterKey] || [];
      const updated = current.includes(option)
        ? current.filter((v) => v !== option)
        : [...current, option];

      if (updated.length === 0) {
        const { [filterKey]: _, ...rest } = prev;
        return rest;
      }

      return { ...prev, [filterKey]: updated };
    });
  };

  // Reset all filters
  const handleReset = () => {
    setSelectedFilters({});
    onApplyFilters?.({});
  };

  if (loading) {
    return (
      <div className="h-full w-[320px] bg-white border shadow-xl flex items-center justify-center">
        <span className="text-gray-500">Loading filters...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full w-[320px] bg-white border shadow-xl flex items-center justify-center">
        <span className="text-red-500 text-sm text-center px-4">{error}</span>
      </div>
    );
  }

  return (
    <div className="h-full w-[320px] bg-white border rounded-r-md shadow-xl flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-sm font-semibold">Filters</h3>
        <button
          onClick={handleReset}
          className="text-sm text-blue-600 flex items-center gap-1"
        >
          Reset All <LuTimerReset />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filterOptions

          .filter((filter) => !(isCustomer && filter.value === "ACCOUNT_ID"))
          .map((filter) => {
            const isOpen = openFilter === filter.value;
            const selectedCount = selectedFilters[filter.value]?.length || 0;

            return (
              <div key={filter.value} className="border-b">
                <div
                  onClick={() => setOpenFilter(isOpen ? null : filter.value)}
                  className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50"
                >
                  <div className="flex items-center gap-2">
                    <input type="checkbox" readOnly checked={selectedCount > 0} />
                    <span className="text-sm font-medium">{filter.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    Include Only {isOpen ? "▲" : "▼"}
                  </span>
                </div>

                {isOpen && (
                  <div className="px-4 pb-4 space-y-2">
                    <p className="text-xs text-blue-700 font-medium">
                      {selectedCount} items selected
                    </p>

                    <div className="max-h-48 overflow-y-auto space-y-2">
                      {filter.options.map((option) => (
                        <label
                          key={option}
                          className="flex items-center gap-2 text-sm"
                        >
                          <input
                            type="checkbox"
                            checked={
                              selectedFilters[filter.value]?.includes(option) ||
                              false
                            }
                            onChange={() => handleCheck(filter.value, option)}
                          />
                          {option}
                        </label>
                      ))}
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        onClick={() => setOpenFilter(null)}
                        className="px-4 py-1 border rounded-md text-blue-700"
                      >
                        Close
                      </button>
                      <button
                        onClick={() => {
                          onApplyFilters(selectedFilters);
                          setOpenFilter(null);
                          onClose?.();
                        }}
                        className="px-4 py-1 bg-gray-600 text-white rounded-md"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default FilterCost;