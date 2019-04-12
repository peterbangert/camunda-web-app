package de.psi.pai.mes.engine.websocket.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;

@Slf4j
@Data
public class Workflow {

    @JsonProperty("task_id")
    private String taskId;
    private String id;
    private String assignee;
    private Status status;
    private List<Field> fields;


    private String form;

    @JsonIgnore
    private Object data;

    @JsonIgnore
    public String getFieldsAsBody() {
        String body = "";
        try {
        HashMap<String, String> bodyMap = new LinkedHashMap<>();
        for (Field field : getFields()) {

            bodyMap.put(field.getKey(), field.getValue());
        }
            body = new ObjectMapper().writeValueAsString(bodyMap);
        } catch (JsonProcessingException e) {
            log.error(e.toString());
        }
        return body;
    }
}
