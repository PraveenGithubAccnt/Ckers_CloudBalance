package com.CloudBalance.CloudBalanceBackend.controller;

import com.CloudBalance.CloudBalanceBackend.Service.CostExplorerService;
import com.CloudBalance.CloudBalanceBackend.dto.CostExplorerResponseDTO;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("api/costexplorer")
public class CostExplorerController {

    private final CostExplorerService costExplorerService;

    public CostExplorerController(CostExplorerService costExplorerService) {
        this.costExplorerService = costExplorerService;
    }

    /**
     * Top-level grouped data (month-wise)
     * Example: /api/cost-explorer/group?groupByColumn=SERVICE&startDate=2025-01-01&endDate=2025-12-31
     */
    @GetMapping("/group")
    public List<CostExplorerResponseDTO> getGroupedDataByMonth(
            @RequestParam String groupByColumn,
            @RequestParam String startMonth,
            @RequestParam String endMonth
    ) {
        return costExplorerService.getMonthlyCostByGroupByMonth(groupByColumn, startMonth.trim(), endMonth.trim());
    }


    /**
     * Drill-down data for a specific group
     * Example: /api/cost-explorer/drill?groupByColumn=SERVICE&groupByValue=Amazon EC2&subGroupByColumn=INSTANCE_TYPE&startDate=2025-01-01&endDate=2025-12-31
     */
    @GetMapping("/drill")
    public List<CostExplorerResponseDTO> getDrillDownData(
            @RequestParam String groupByColumn,
            @RequestParam String groupByValue,
            @RequestParam String subGroupByColumn,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate
    ) {
        return costExplorerService.getMonthlyCostBySubGroup(groupByColumn, groupByValue, subGroupByColumn, startDate, endDate);
    }
}
