package de.psi.pai.mes.engine.camunda.model;

import lombok.Data;

@Data
public class ProcessDefinition {

    private String id;
    private String key;
    private String category;
    private String description;
    private String name;
    private int version;
    private String resource;
    private String deploymentId;
    private String diagram;
    private boolean suspended;
    private String tenantId;
    private String versionTag;
    private int historyTimeToLive;
}
