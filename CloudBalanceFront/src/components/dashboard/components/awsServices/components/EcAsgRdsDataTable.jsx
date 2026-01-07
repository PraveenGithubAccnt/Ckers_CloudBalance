import { useState } from "react";

function EcAsgRdsDataTable({ service, data = [] }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const columnConfig = {
    EC2: [
      { key: "id", label: "ID" },
      { key: "resourceId", label: "Resource ID" },
      { key: "name", label: "Name" },
      { key: "status", label: "Status" },
      { key: "region", label: "Region" },
    ],
    ASG: [
      { key: "id", label: "ID" },
      { key: "resourceId", label: "Resource ID" },
      { key: "name", label: "Name" },
      { key: "desired", label: "Desired Capacity" },
      { key: "min", label: "Min Size" },
      { key: "max", label: "Max Size" },
      { key: "status", label: "Status" },
      { key: "region", label: "Region" },
    ],
    RDS: [
      { key: "id", label: "ID" },
      { key: "resourceId", label: "Resource ID" },
      { key: "name", label: "Name" },
      { key: "engine", label: "Engine" },
      { key: "status", label: "Status" },
      { key: "region", label: "Region" },
    ],
  };

  const columns = columnConfig[service] || [];

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") {
        direction = "desc";
      } else if (sortConfig.direction === "desc") {
        direction = null;
      }
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = () => {
    if (!sortConfig.direction || !sortConfig.key) {
      return data;
    }

    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      // Handle null/undefined values
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      // Convert to numbers if both values are numeric
      const aNum = Number(aVal);
      const bNum = Number(bVal);
      const bothNumbers = !isNaN(aNum) && !isNaN(bNum);

      if (bothNumbers) {
        return sortConfig.direction === "asc" ? aNum - bNum : bNum - aNum;
      }

      // String comparison
      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();

      if (sortConfig.direction === "asc") {
        return aStr.localeCompare(bStr);
      } else {
        return bStr.localeCompare(aStr);
      }
    });
  };

  const sortedData = getSortedData();

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" />
        </svg>
      );
    }
    if (sortConfig.direction === "asc") {
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
        </svg>
      );
    }
    if (sortConfig.direction === "desc") {
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
        </svg>
      );
    }
    return (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" />
      </svg>
    );
  };

  return (
    <div className="flex flex-col">
      <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
        <div className="overflow-auto max-h-[calc(100vh-120px)]">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 bg-blue-600 z-10">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="p-3 text-left border-b border-gray-200"
                  >
                    <div
                      className="flex items-center gap-2 text-white cursor-pointer hover:text-gray-300 select-none"
                      onClick={() => handleSort(col.key)}
                    >
                      <span className="text-md">{col.label}</span>
                      {getSortIcon(col.key)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="p-3 text-center text-gray-400 border-b border-gray-100"
                  >
                    No data available
                  </td>
                </tr>
              ) : (
                sortedData.map((row, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-blue-50 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className="p-3 border-b border-gray-100"
                      >
                        {row[col.key] ?? "-"}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EcAsgRdsDataTable;