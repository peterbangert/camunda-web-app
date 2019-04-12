package de.psi.pai.mes.engine.websocket.model;

import lombok.Data;

@Data
public class Field {

    private String key;
    private String value;

    public Field(String key, String value) {
        this.key = key;
        this.value = value;
    }

}
