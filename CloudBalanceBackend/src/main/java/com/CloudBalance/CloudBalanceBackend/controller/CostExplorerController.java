package com.CloudBalance.CloudBalanceBackend.controller;

import com.CloudBalance.CloudBalanceBackend.Service.CostExplorerService;
import com.CloudBalance.CloudBalanceBackend.dto.CostExplorerResponseDTO;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/costexplorer")
public class CostExplorerController {

    private final CostExplorerService costExplorerService;

    public CostExplorerController(CostExplorerService costExplorerService) {
        this.costExplorerService = costExplorerService;
    }

    // Get distinct values for column
    @GetMapping("/filteroptions")
    public Map<String, List<String>> getFilterOptions(
            @RequestParam(required = false) String column
    ) {
        if (column != null && !column.isEmpty()) {
            // Get distinct values for a specific column
            return Map.of(column, costExplorerService.getDistinctValuesForColumn(column));
        } else {
            // Get distinct values for ALL columns
            return costExplorerService.getAllFilterOptions();
        }
    }

    @PostMapping("/getcostdata")
    public List<CostExplorerResponseDTO> getFilteredData(
            @RequestParam String groupByColumn,
            @RequestParam String startMonth,
            @RequestParam String endMonth,
            @RequestBody(required = false) Map<String, List<String>> filters
    ) {
        return costExplorerService.getFilteredMonthlyCost(groupByColumn, startMonth, endMonth, filters);
    }
}
