package com.CloudBalance.CloudBalanceBackend.enums;

public enum CostGroupBy {

    SERVICE("SERVICE"),
    INSTANCE_TYPE("INSTANCE_TYPE"),
    ACCOUNT_ID("ACCOUNT_ID"),
    USAGE_TYPE("USAGE_TYPE"),
    PLATFORM("PLATFORM"),
    REGION("REGION"),
    PURCHASE_OPTION("PURCHASE_OPTION"),
    API_OPERATION("API_OPERATION"),
    USAGE_TYPE_GROUP("CHARGE_TYPE"),
    AVAILABILITY_ZONE("AVAILABILITY_ZONE"),
    TENANCY("TENANCY"),
    LEGAL_ENTITY("LEGAL_ENTITY"),
    BILLING_ENTITY("BILLING_ENTITY");

    private final String column;

    CostGroupBy(String column) {
        this.column = column;
    }

    public String column() {
        return column;
    }
}
