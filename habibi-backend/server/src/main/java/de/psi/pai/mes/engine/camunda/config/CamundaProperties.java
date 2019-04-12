package de.psi.pai.mes.engine.camunda.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@EnableConfigurationProperties
@ConfigurationProperties(prefix="camunda")
public class CamundaProperties {

    private String baseUrl;
    private String defaultEngine;
    private String task;
    private String formVariables;
    private String submitForm;
    private String processDefinition;
    private String deployments;
    private String claim;
    private String variables;
    private String name;



}
