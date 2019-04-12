package de.psi.pai.mes.engine.camunda.service;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.psi.pai.mes.engine.camunda.config.CamundaProperties;
import de.psi.pai.mes.engine.camunda.model.*;
import de.psi.pai.mes.engine.websocket.model.Field;
import de.psi.pai.mes.engine.websocket.model.Workflow;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;


@Slf4j
@Service
public class CamundaService {

    private HttpHeaders camundaHeaders;
    private HttpEntity<String> camundaHeaderEntity;
    private ObjectMapper objectMapper;
    private CamundaProperties properties;
    private ClaimTaskPayload taskPayload;
    private RestTemplate restTemplate;


    public CamundaService(CamundaProperties properties, ClaimTaskPayload taskPayload) {

        this.taskPayload = taskPayload;
        this.properties = properties;
        camundaHeaders = new HttpHeaders();
        objectMapper = new ObjectMapper();
        camundaHeaders.setContentType(MediaType.APPLICATION_JSON);
        List<MediaType> mediatypes = Arrays.asList(MediaType.APPLICATION_JSON, MediaType.TEXT_PLAIN, MediaType.ALL);
        camundaHeaders.setAccept(mediatypes);
        camundaHeaderEntity = new HttpEntity<String>(camundaHeaders);
        restTemplate = new RestTemplate();
    }

    private HttpEntity HeaderEntityWithCookie(String cookie) {
        return new HttpEntity<String>(CamundaHeaderWithCookie(cookie));
    }

    private HttpHeaders CamundaHeaderWithCookie(String cookie) {
        HttpHeaders temporaryCamundaHeader = camundaHeaders;
        temporaryCamundaHeader.set("Cookie", cookie);
        return temporaryCamundaHeader;
    }

    public StartedProcess startProcess(String cookie, Workflow workflow, String pid) throws IOException, HttpClientErrorException {
        HttpEntity<?> requestBody = new HttpEntity<>(workflow.getFieldsAsBody(), CamundaHeaderWithCookie(cookie));
        String uri = properties.getBaseUrl() + properties.getDefaultEngine() + properties.getProcessDefinition() + "/" + pid + properties.getSubmitForm();
        HttpEntity result = restTemplate.exchange(uri, HttpMethod.POST, requestBody, String.class);
        return this.objectMapper.readValue(result.getBody().toString(), new TypeReference<StartedProcess>() {});
    }

    public List<Task> listTasks(String cookie) throws IOException , HttpClientErrorException{
        String uri = properties.getBaseUrl() + properties.getDefaultEngine() + properties.getTask();
        HttpEntity result =  restTemplate.exchange(uri, HttpMethod.GET, HeaderEntityWithCookie(cookie), String.class);
        return  this.objectMapper.readValue(result.getBody().toString(), new TypeReference<List<Task>>() {});
    }

    public Task claimTasks(String cookie, String id) throws IOException, HttpClientErrorException {

        HttpEntity<String> request = new HttpEntity<String>(taskPayload.convertToJson(), CamundaHeaderWithCookie(cookie));
        List<Task> taskList = listTasks(cookie);

        taskList = taskList.stream()
                .filter(e -> e.getProcessInstanceId().equals(id))
                .collect(Collectors.toList());

        taskList.forEach(e -> {
            log.debug(" USER claiming task : {}", e.getId());
            String uri = properties.getBaseUrl() + properties.getDefaultEngine() + properties.getTask() + "/" + e.getId() + "/claim";
            restTemplate.exchange(uri, HttpMethod.POST, request, String.class);
        });

        return taskList.isEmpty()
                ? null
                : taskList.get(0);
    }

    private Task getTask(String cookie, Task task) throws IOException, HttpClientErrorException {

        String uri = properties.getBaseUrl() + properties.getDefaultEngine() + properties.getTask() + "/" + task.getId();
        HttpEntity result = restTemplate.exchange(uri, HttpMethod.GET, HeaderEntityWithCookie(cookie), String.class);
        return this.objectMapper.readValue(result.getBody().toString(), new TypeReference<Task>() {
        });
    }

    public String getUserTasks(String cookie, String id) throws IOException, HttpClientErrorException {

        List<Field> rtn = new ArrayList<>();
        String uri = properties.getBaseUrl() + properties.getDefaultEngine() + properties.getTask() + "/" + id + properties.getFormVariables();
        return restTemplate.exchange(uri, HttpMethod.GET, HeaderEntityWithCookie(cookie), String.class).getBody();
        
    }

    public void postUserTasks(String cookie, Workflow message) throws IOException, HttpClientErrorException {

        String uri = properties.getBaseUrl() + properties.getDefaultEngine() + properties.getTask() + "/" + message.getTaskId() + properties.getSubmitForm();
        log.warn("-- method does not handle multiple user task fields --");

        FormField field = new FormField();
        FormVariables variables = new FormVariables();
        variables.setType(message.getFields().get(0).getKey());
        variables.setValue(message.getFields().get(0).getValue());
        field.setFormField_30aimms(variables);

        ObjectMapper mapper = new ObjectMapper();
        String jsonInString = mapper.writeValueAsString(field);
        String input = "{\"variables\": " + jsonInString + "}";

        restTemplate.exchange(uri, HttpMethod.POST, new HttpEntity<String>(input, CamundaHeaderWithCookie(cookie)), String.class);

    }


    public ProcessDefinition getProcessDefinition(String cookie, Workflow workflow) throws IOException, HttpClientErrorException {

        final String uri = properties.getBaseUrl() + properties.getDefaultEngine() + properties.getProcessDefinition();
        HttpEntity result = restTemplate.exchange(uri, HttpMethod.GET, HeaderEntityWithCookie(cookie), String.class);

        List<ProcessDefinition> processDefinitions = this.objectMapper.readValue(result.getBody().toString(), new TypeReference<List<ProcessDefinition>>() {});
        return processDefinitions.stream()
                .filter(e -> e.getDeploymentId().equals(workflow.getId()))
                .findAny()
                .orElse(null);
    }

    public List<Deployment> getDeployments(String cookie) throws IOException {

        final String uri = properties.getBaseUrl() + properties.getDeployments();
        HttpEntity result = restTemplate.exchange(uri, HttpMethod.GET, HeaderEntityWithCookie(cookie), String.class);
        return this.objectMapper.readValue(result.getBody().toString(), new TypeReference<List<Deployment>>() {});
    }

    public boolean checkIfFinished(String cookie, Workflow message) {

        String url = properties.getBaseUrl() + properties.getDefaultEngine() + properties.getTask() + "/" + message.getTaskId();
        boolean finished = true;
        try {

            ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.GET, HeaderEntityWithCookie(cookie), String.class);

            if (responseEntity.getStatusCode().is2xxSuccessful()) {
                finished = false;
            }
        } catch (HttpClientErrorException e) {
            log.debug("Process is Finished");
        }
        return finished;
    }

    public Deployment getDeployment(String cookie, String id) throws IOException, HttpClientErrorException {

        final String uri = properties.getBaseUrl() + properties.getDeployments() + "/" + id;
        HttpEntity result = restTemplate.exchange(uri, HttpMethod.GET, HeaderEntityWithCookie(cookie), String.class);
        return  this.objectMapper.readValue(result.getBody().toString(), new TypeReference<Deployment>() {});
    }
}


