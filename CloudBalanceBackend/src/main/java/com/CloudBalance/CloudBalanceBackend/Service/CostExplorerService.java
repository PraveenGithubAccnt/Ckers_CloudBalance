package com.CloudBalance.CloudBalanceBackend.Service;
import com.CloudBalance.CloudBalanceBackend.dto.CostExplorerResponseDTO;
import com.snowflake.snowpark.Row;
import com.snowflake.snowpark.Session;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class CostExplorerService {

    private final Session session;

    private static final String[] MONTHS =
            {"JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"};

    public CostExplorerService(Session session) {
        this.session = session;
    }

    /**
     * Get month-wise aggregated cost grouped by a top-level column
     * Example groupByColumn: SERVICE, REGION, INSTANCE_TYPE
     */
    public List<CostExplorerResponseDTO> getMonthlyCostByGroupByMonth(
            String groupByColumn, String startMonth, String endMonth) {

        String monthSums = buildMonthSumSQL();

        //convert month strings to first day and last day for filtering
        String startDate = startMonth + "-01";
        String endDate = endMonth + "-31"; // simple trick, Snowflake handles dates correctly

        String query = String.format("""
            SELECT %s, %s, SUM(cost) AS TOTAL
            FROM cloudbalance.public.costreport
            WHERE TO_CHAR(bill_date, 'YYYY-MM') BETWEEN '%s' AND '%s'
            GROUP BY %s, TO_CHAR(bill_date, 'YYYY')
            ORDER BY TOTAL DESC
            """, groupByColumn, monthSums, startMonth, endMonth, groupByColumn);

        Row[] rows = session.sql(query).collect();

        return mapRowsToDTO(rows, groupByColumn);
    }


    /**
     * Get month-wise cost for a specific group value (drill-down)
     * Example: groupByColumn=SERVICE, groupByValue=Amazon EC2, subGroupByColumn=INSTANCE_TYPE
     */
    public List<CostExplorerResponseDTO> getMonthlyCostBySubGroup(
            String groupByColumn,
            String groupByValue,
            String subGroupByColumn,
            LocalDate startDate,
            LocalDate endDate
    ) {

        String monthSums = buildMonthSumSQL();

        String query = String.format("""
                SELECT %s, %s, SUM(cost) AS TOTAL
                FROM cloudbalance.public.costreport
                WHERE %s = '%s'
                  AND bill_date BETWEEN '%s' AND '%s'
                GROUP BY %s, TO_CHAR(bill_date, 'YYYY')
                ORDER BY TOTAL DESC
                """,
                subGroupByColumn, monthSums,
                groupByColumn, groupByValue,
                startDate, endDate,
                subGroupByColumn
        );

        Row[] rows = session.sql(query).collect();

        return mapRowsToDTO(rows, subGroupByColumn);
    }

    /**
     * Helper: builds the dynamic SUM(CASE WHEN ...) SQL fragment for each month
     */
    private String buildMonthSumSQL() {
        StringBuilder sb = new StringBuilder();
        for (int i = 1; i <= 12; i++) {
            sb.append(String.format(
                    "SUM(CASE WHEN TO_CHAR(bill_date, 'MM') = '%02d' THEN cost ELSE 0 END) AS %s%s",
                    i, MONTHS[i - 1], i < 12 ? ", " : ""
            ));
        }
        return sb.toString();
    }

    /**
     * Helper: maps Snowflake Rows to CostExplorerResponseDTO
     */
    private List<CostExplorerResponseDTO> mapRowsToDTO(Row[] rows, String groupByColumn) {
        List<CostExplorerResponseDTO> result = new ArrayList<>();
        for (Row row : rows) {
            Map<String, Long> monthlyCost = new LinkedHashMap<>();
            for (int i = 0; i < 12; i++) {
                monthlyCost.put(MONTHS[i], row.getLong(i + 1)); // first column = group key
            }

            result.add(new CostExplorerResponseDTO(
                    row.getString(0),  // groupByKey
                    groupByColumn,     // groupByField
                    monthlyCost,       // month -> cost
                    row.getLong(13)    // totalCost
            ));

        }
        return result;
    }
}