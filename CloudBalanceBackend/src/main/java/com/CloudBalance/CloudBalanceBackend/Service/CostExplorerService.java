package com.CloudBalance.CloudBalanceBackend.Service;

import com.CloudBalance.CloudBalanceBackend.dto.CostExplorerResponseDTO;
import com.snowflake.snowpark.Row;
import com.snowflake.snowpark.Session;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class CostExplorerService {

    private final Session session;

    public CostExplorerService(Session session) {
        this.session = session;
    }

    // Get distinct values for a specific column
    public List<String> getDistinctValuesForColumn(String columnName) {
        String query = String.format("""
            SELECT DISTINCT %s
            FROM cloudbalance.public.costreport
            WHERE %s IS NOT NULL
            ORDER BY %s
            LIMIT 1000
            """,
                columnName, columnName, columnName
        );

        Row[] rows = session.sql(query).collect();

        List<String> distinctValues = new ArrayList<>();
        for (Row row : rows) {
            String value = row.getString(0);
            if (value != null && !value.trim().isEmpty()) {
                distinctValues.add(value);
            }
        }
        return distinctValues;
    }

    // Get distinct values for ALL filter columns
    public Map<String, List<String>> getAllFilterOptions() {
        Map<String, List<String>> filterOptions = new LinkedHashMap<>();

        String[] columns = {
                "SERVICE",
                "INSTANCE_TYPE",
                "ACCOUNT_ID",
                "USAGE_TYPE",
                "PLATFORM",
                "REGION",
                "PURCHASE_OPTION",
                "API_OPERATION",
                "USAGE_TYPE_GROUP",
                "AVAILABILITY_ZONE",
                "TENANCY",
                "LEGAL_ENTITY",
                "BILLING_ENTITY"
        };

        for (String column : columns) {
            try {
                filterOptions.put(column, getDistinctValuesForColumn(column));
            } catch (Exception e) {
                filterOptions.put(column, new ArrayList<>());
            }
        }
        return filterOptions;
    }

    /**
     * Unified method: Get monthly cost data with optional filters
     */
    public List<CostExplorerResponseDTO> getFilteredMonthlyCost(
            String groupByColumn,
            String startMonth,
            String endMonth,
            Map<String, List<String>> filters
    ) {

        StringBuilder whereClause = new StringBuilder();
        whereClause.append(String.format(
                "TO_CHAR(bill_date, 'YYYY-MM') BETWEEN '%s' AND '%s'",
                startMonth, endMonth
        ));

        if (filters != null && !filters.isEmpty()) {
            for (Map.Entry<String, List<String>> entry : filters.entrySet()) {
                if (entry.getValue() != null && !entry.getValue().isEmpty())
                {
                    String values = entry.getValue().stream()
                            .map(v -> "'" + v.replace("'", "''") + "'")
                            .collect(Collectors.joining(", "));
                    whereClause.append(" AND ")
                            .append(entry.getKey())
                            .append(" IN (")
                            .append(values)
                            .append(")");
                }
            }
        }

        String query = String.format("""
            SELECT %s,
                   TO_CHAR(bill_date, 'YYYY-MON') AS MONTH_YEAR,
                   SUM(cost) AS TOTAL
            FROM cloudbalance.public.costreport
            WHERE %s
            GROUP BY %s, TO_CHAR(bill_date, 'YYYY-MON')
            ORDER BY MONTH_YEAR
            LIMIT 1000
            """,
                groupByColumn,
                whereClause.toString(),
                groupByColumn
        );

        Row[] rows = session.sql(query).collect();
        return mapRowsToDTO(rows, groupByColumn);
    }


    private List<CostExplorerResponseDTO> mapRowsToDTO(Row[] rows, String groupByColumn) {
        Map<String, CostExplorerResponseDTO> groupedData = new LinkedHashMap<>();

        for (Row row : rows) {
            String groupKey = row.getString(0);
            String monthYear = row.getString(1);
            long cost = row.getLong(2);

            groupedData.putIfAbsent(
                    groupKey,
                    new CostExplorerResponseDTO(
                            groupKey,
                            groupByColumn,
                            new LinkedHashMap<>(),
                            0L
                    )
            );

            CostExplorerResponseDTO dto = groupedData.get(groupKey);
            dto.getMonthlyCost().put(monthYear, cost);
            dto.setTotalCost(dto.getTotalCost() + cost);
        }

        return new ArrayList<>(groupedData.values());
    }
}
