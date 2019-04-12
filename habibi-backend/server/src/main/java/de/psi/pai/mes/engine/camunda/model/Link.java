package de.psi.pai.mes.engine.camunda.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class Link {

    private String href;
    private String method;

    @JsonProperty("rel")
    private String relation;
}
