import React, { useMemo } from "react";

const data = [
  {
    service: "Amazon Elastic Compute Cloud",
    jun: 39086.88,
    jul: 42441.19,
    aug: 36717.95,
    sep: 38043.52,
    oct: 33826.71,
    nov: 31355.12,
  },
  {
    service: "Amazon Relational Database Service",
    jun: 25434.85,
    jul: 24148.67,
    aug: 24200.03,
    sep: 24554.95,
    oct: 23718.76,
    nov: 22354.91,
  },
];

const formatCurrency = (value) =>
  `$${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
  })}`;

function AwsServiceTable() {
  // Calculate row totals and grand totals automatically
  const { dataWithTotals, grandTotal } = useMemo(() => {
    const months = ["jun", "jul", "aug", "sep", "oct", "nov"];
    
    // Calculate total for each row
    const dataWithTotals = data.map((row) => {
      const total = months.reduce((sum, month) => sum + (row[month] || 0), 0);
      return { ...row, total };
    });
    
    // Calculate grand totals for each month and overall total
    const grandTotal = months.reduce(
      (acc, month) => {
        acc[month] = dataWithTotals.reduce((sum, row) => sum + (row[month] || 0), 0);
        return acc;
      },
      {}
    );
    
    // Calculate overall grand total
    grandTotal.total = dataWithTotals.reduce((sum, row) => sum + row.total, 0);
    
    return { dataWithTotals, grandTotal };
  }, []);

  return (
    <div className="w-full px-6">
      <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
        <div className="max-h-[420px] overflow-auto">
          <table className="w-full border-collapse text-sm">
            <thead className="sticky top-0 bg-gray-100 z-10">
              <tr className="border-b">
                <th className="p-3 text-left">Service</th>
                <th className="p-3 text-right">Jun 2025</th>
                <th className="p-3 text-right">Jul 2025</th>
                <th className="p-3 text-right">Aug 2025</th>
                <th className="p-3 text-right">Sep 2025</th>
                <th className="p-3 text-right">Oct 2025</th>
                <th className="p-3 text-right">Nov 2025</th>
                <th className="p-3 text-right text-blue-600 font-semibold">
                  Total
                </th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {dataWithTotals.map((row, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3 text-gray-700">{row.service}</td>
                  <td className="p-3 text-right">
                    {formatCurrency(row.jun)}
                  </td>
                  <td className="p-3 text-right">
                    {formatCurrency(row.jul)}
                  </td>
                  <td className="p-3 text-right">
                    {formatCurrency(row.aug)}
                  </td>
                  <td className="p-3 text-right">
                    {formatCurrency(row.sep)}
                  </td>
                  <td className="p-3 text-right">
                    {formatCurrency(row.oct)}
                  </td>
                  <td className="p-3 text-right">
                    {formatCurrency(row.nov)}
                  </td>
                  <td className="p-3 text-right font-semibold text-blue-600">
                    {formatCurrency(row.total)}
                  </td>
                </tr>
              ))}

              {/* GRAND TOTAL */}
              <tr className="bg-gray-50 border-t font-semibold">
                <td className="p-3">Total</td>
                <td className="p-3 text-right text-blue-600">
                  {formatCurrency(grandTotal.jun)}
                </td>
                <td className="p-3 text-right text-blue-600">
                  {formatCurrency(grandTotal.jul)}
                </td>
                <td className="p-3 text-right text-blue-600">
                  {formatCurrency(grandTotal.aug)}
                </td>
                <td className="p-3 text-right text-blue-600">
                  {formatCurrency(grandTotal.sep)}
                </td>
                <td className="p-3 text-right text-blue-600">
                  {formatCurrency(grandTotal.oct)}
                </td>
                <td className="p-3 text-right text-blue-600">
                  {formatCurrency(grandTotal.nov)}
                </td>
                <td className="p-3 text-right text-blue-700">
                  {formatCurrency(grandTotal.total)}
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