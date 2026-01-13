package com.CloudBalance.CloudBalanceBackend.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CostExplorerResponseDTO {

    private String groupByKey;          // e.g., Amazon EC2
    private String groupByField;        // e.g., SERVICE
    private Map<String, Long> monthlyCost; // month -> cost mapping
    private Long totalCost;             // total cost for all months
}
