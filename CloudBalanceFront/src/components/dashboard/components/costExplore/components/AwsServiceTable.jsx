import { useState, useEffect, useMemo } from "react";
import { getCostExplorerGroup } from "../../../../../api/costExplorerApi";
import { useContext } from "react";
import { AccountContext } from "../../../../../context/AccountContext";
const MONTH_ORDER = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const MONTH_NAMES = {
  JAN: "Jan",
  FEB: "Feb",
  MAR: "Mar",
  APR: "Apr",
  MAY: "May",
  JUN: "Jun",
  JUL: "Jul",
  AUG: "Aug",
  SEP: "Sep",
  OCT: "Oct",
  NOV: "Nov",
  DEC: "Dec",
};

const formatCurrency = (value) =>
  `$${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
  })}`;

// Helper function to convert "Jan 2025" -> "2025-01"
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
    // Primary options
    "Service": "SERVICE",
    "Region": "REGION",
    "Account ID": "ACCOUNT_ID",
    "Instance Type": "INSTANCE_TYPE",
    "Usage Type": "USAGE_TYPE",
    "Platform": "PLATFORM",
    "Purchase Option": "PURCHASE_OPTION",
    "API Operation": "API_OPERATION",
    "Resource": "RESOURCE",
    "Usage Type Group": "USAGE_TYPE_GROUP",
    "Availability Zone": "AVAILABILITY_ZONE",
    "Tenancy": "TENANCY",
    "Legal Entity": "LEGAL_ENTITY",
    "Billing Entity": "BILLING_ENTITY",
  };

  return groupMap[groupName] || "SERVICE";
};

// Get the months to display based on date range
const getMonthsInRange = (start, end) => {
  const startApiFormat = convertDateToApiFormat(start);
  const endApiFormat = convertDateToApiFormat(end);

  const [startYear, startMonth] = startApiFormat.split("-").map(Number);
  const [endYear, endMonth] = endApiFormat.split("-").map(Number);

  const months = [];
  let currentYear = startYear;
  let currentMonth = startMonth;

  while (
    currentYear < endYear ||
    (currentYear === endYear && currentMonth <= endMonth)
  ) {
    const monthKey = MONTH_ORDER[currentMonth - 1];
    months.push({
      key: `${currentYear}-${MONTH_NAMES[monthKey]}`,
      display: `${MONTH_NAMES[monthKey]} ${currentYear}`,
    });

    currentMonth++;
    if (currentMonth > 12) {
      currentMonth = 1;
      currentYear++;
    }
  }

  return months;
};

function AwsServiceTable({ activeGroup, startDate, endDate, appliedFilters }) {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { selectedAccountId } = useContext(AccountContext);

  const visibleMonths = useMemo(
    () => getMonthsInRange(startDate, endDate),
    [startDate, endDate]
  );

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
        setTableData(response.data || []);
      } catch (error) {
        console.error("Error fetching table data:", error);
        setError("Failed to load table data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeGroup, startDate, endDate, appliedFilters, selectedAccountId]);

  // Calculate ONLY column totals
  const columnTotals = useMemo(() => {
    if (!tableData.length) {
      return {};
    }

    const totals = {};

    // Calculate total for each visible month
    visibleMonths.forEach((month) => {
      totals[month.key] = tableData.reduce(
        (sum, row) => sum + (row.monthlyCost?.[month.key] || 0),
        0
      );
    });

    // Calculate grand total
    totals.grandTotal = tableData.reduce(
      (sum, row) => sum + (row.totalCost || 0),
      0
    );

    return totals;
  }, [tableData, visibleMonths]);

  // Get column header label
  const getColumnLabel = () => {
    const labelMap = {
      // Primary options
      "Service": "Service",
      "Region": "Region",
      "Account ID": "Account ID",
      "Instance Type": "Instance Type",
      "Usage Type": "Usage Type",
      "Platform": "Platform",

      // More options
      "Purchase Option": "Purchase Option",
      "API Operation": "API Operation",
      "Resource": "Resource",
      "Usage Type Group": "Usage Type Group",
      "Availability Zone": "Availability Zone",
      "Tenancy": "Tenancy",
      "Legal Entity": "Legal Entity",
      "Billing Entity": "Billing Entity",
    };
    return labelMap[activeGroup] || "Group";
  };

  if (loading) {
    return (
      <div className="w-full px-6">
        <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
          <div className="flex items-center justify-center h-40">
            <div className="text-gray-500">Loading table data...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full px-6">
        <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
          <div className="flex items-center justify-center h-40">
            <div className="text-red-500">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  if (!tableData.length) {
    return (
      <div className="w-full px-6">
        <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
          <div className="flex items-center justify-center h-40">
            <div className="text-gray-500">No data available</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-6">
      <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
        <div className="max-h-[420px] overflow-auto">
          <table className="w-full border-collapse text-sm">
            <thead className="sticky top-0 bg-gray-100 z-10">
              <tr className="border-b">
                <th className="p-3 text-left">{getColumnLabel()}</th>
                {visibleMonths.map((month) => (
                  <th key={month.key} className="p-3 text-right">
                    {month.display}
                  </th>
                ))}
                <th className="p-3 text-right text-blue-600 font-semibold">
                  Total
                </th>
              </tr>
            </thead>

            <tbody>
              {tableData.map((row, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3 text-gray-700">{row.groupByKey}</td>
                  {visibleMonths.map((month) => (
                    <td key={month.key} className="p-3 text-right">
                      {formatCurrency(row.monthlyCost?.[month.key] || 0)}
                    </td>
                  ))}
                  <td className="p-3 text-right font-semibold text-blue-600">
                    {formatCurrency(row.totalCost || 0)}
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50 border-t font-semibold">
                <td className="p-3">Total</td>
                {visibleMonths.map((month) => (
                  <td key={month.key} className="p-3 text-right text-blue-600">
                    {formatCurrency(columnTotals[month.key] || 0)}
                  </td>
                ))}
                <td className="p-3 text-right text-blue-700">
                  {formatCurrency(columnTotals.grandTotal || 0)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AwsServiceTable;
