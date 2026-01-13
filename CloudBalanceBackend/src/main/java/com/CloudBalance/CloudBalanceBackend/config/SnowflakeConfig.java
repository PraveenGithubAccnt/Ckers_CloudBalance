package com.CloudBalance.CloudBalanceBackend.config;

import com.snowflake.snowpark.Session;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class SnowflakeConfig {

    @Value("${snowflake.url}")
    private String url;

    @Value("${snowflake.user}")
    private String user;

    @Value("${snowflake.password}")
    private String password;

    @Value("${snowflake.role}")
    private String role;

    @Value("${snowflake.warehouse}")
    private String warehouse;

    @Value("${snowflake.database}")
    private String database;

    @Value("${snowflake.schema}")
    private String schema;

    @Bean
    public Session snowflakeSession() {
        Map<String, String> config = new HashMap<>();

        config.put("url", url);
        config.put("user", user);
        config.put("password", password);
        config.put("role", role);
        config.put("warehouse", warehouse);
        config.put("db", database);
        config.put("schema", schema);

        return Session.builder()
                .configs(config)
                .create();
    }
}

