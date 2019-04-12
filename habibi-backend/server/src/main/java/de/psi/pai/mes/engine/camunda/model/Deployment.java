package de.psi.pai.mes.engine.camunda.model;

import lombok.Data;

import java.util.List;

@Data
public class Deployment {

    private String deploymentTime;
    private String id;
    private String name;
    private List<DeploymentResource> resources;

}
