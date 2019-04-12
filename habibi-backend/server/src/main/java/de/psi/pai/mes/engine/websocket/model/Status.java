package de.psi.pai.mes.engine.websocket.model;

import com.fasterxml.jackson.annotation.JsonValue;

public enum Status {
    TASK("task"),
    FINISHED("finished"),
    STARTING("starting");

    @JsonValue
    private String status;

    Status(String status) {
        this.status = status;
    }
}
