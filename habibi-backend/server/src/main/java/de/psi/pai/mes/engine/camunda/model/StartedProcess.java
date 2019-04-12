
package de.psi.pai.mes.engine.camunda.model;

import lombok.Data;

import java.util.List;

@Data
public class StartedProcess {

    private String businessKey;
    private String caseInstanceId;
    private String definitionId;
    private boolean ended;
    private String id;
    private List<Link> links;
    private boolean suspended;
    private String tenantId;

}
