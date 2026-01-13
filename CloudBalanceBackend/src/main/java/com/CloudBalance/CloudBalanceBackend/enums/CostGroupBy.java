package com.CloudBalance.CloudBalanceBackend.enums;

public enum CostGroupBy {
    SERVICE("SERVICE"),
    INSTANCE_TYPE("INSTANCE_TYPE"),
    ACCOUNT_ID("ACCOUNT_ID"),
    USAGE_TYPE("USAGE_TYPE"),
    PLATFORM("PLATFORM"),
    REGION("REGION");

    private final String column;

    CostGroupBy(String column) {
        this.column = column;
    }

    public String column() {
        return column;
    }
}
