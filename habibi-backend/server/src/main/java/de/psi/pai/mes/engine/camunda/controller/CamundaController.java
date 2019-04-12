package de.psi.pai.mes.engine.camunda.controller;

import de.psi.pai.mes.engine.camunda.model.Deployment;
import de.psi.pai.mes.engine.camunda.model.Task;
import de.psi.pai.mes.engine.camunda.service.CamundaService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api")
public class CamundaController {

    private CamundaService camundaService;

    public CamundaController(CamundaService camundaService) {
        this.camundaService = camundaService;
    }

    @GetMapping("/open-tasks")
    public List<Task> getOpenTasks(@RequestHeader("Cookie") String cookie) throws IOException, HttpClientErrorException{
        log.debug(" THIS IS THE SESSION ID -- {} " , cookie);
        return this.camundaService.listTasks(cookie);
    }

    @GetMapping("/deployments")
    public List<Deployment> getDeployments(@RequestHeader("Cookie") String cookie) throws IOException, HttpClientErrorException{
        log.debug(" THIS IS THE SESSION ID -- {} " , cookie);
        return this.camundaService.getDeployments(cookie);
    }

    @GetMapping("/deployments/{id}")
    public Deployment getDeployment(@RequestHeader("Cookie") String cookie, @PathVariable String id)throws IOException, HttpClientErrorException {
        return this.camundaService.getDeployment(cookie, id);

    }




}
