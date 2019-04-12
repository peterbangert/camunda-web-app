package de.psi.pai.mes.engine.websocket.service;

import de.psi.pai.mes.engine.camunda.model.ProcessDefinition;
import de.psi.pai.mes.engine.camunda.model.StartedProcess;
import de.psi.pai.mes.engine.camunda.model.Task;
import de.psi.pai.mes.engine.camunda.service.CamundaService;
import de.psi.pai.mes.engine.websocket.model.Status;
import de.psi.pai.mes.engine.websocket.model.Workflow;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@Slf4j
public class WebsocketService {


    private CamundaService camundaService;
    private String cookie;

    public WebsocketService(CamundaService camundaService) {
        this.camundaService = camundaService;
    }


    public Workflow handleMessage(String cookie, Workflow message)  {
        this.cookie = cookie;

        log.debug("2 Handling Message ");
        Workflow response = new Workflow();
        response.setId(message.getId());

        try {
            if (message.getStatus() == Status.TASK) {
                this.SubmitUserTask(message, response);
                return response;
            }
            if ( message.getTaskId() == null || message.getTaskId().equals("") ) {
                this.StartTask(message, response);

            } else if (message.getAssignee() == null || message.getAssignee().equals("")) {
                this.ClaimTask(message, response);
            } else {
                response.setAssignee(message.getAssignee());
                response.setTaskId(message.getTaskId());
            }
            response.setForm( camundaService.getUserTasks(cookie, message.getTaskId()));
            response.setStatus(Status.TASK);

        } catch (IOException e) {
            log.error("Object Mapping Issue {}", this.getClass().toString());
        }
        return response;
    }

    private void ClaimTask(Workflow message, Workflow response) throws IOException {
        log.debug("3.3 Claiming Task ");
        response.setTaskId(message.getTaskId());
        Task task = camundaService.claimTasks(cookie,message.getTaskId());
        response.setAssignee(task.getAssignee());
        response.setData(task);
    }

    private void StartTask(Workflow message, Workflow response) throws IOException{
        log.debug("3.2 Starting Task {} ", message.getId());
        ProcessDefinition pd =  camundaService.getProcessDefinition(cookie,message);
        StartedProcess st_p = camundaService.startProcess(cookie,message,pd.getId() );

        Task task = camundaService.claimTasks(cookie, st_p.getId());
        message.setTaskId(task.getId());
        response.setTaskId(task.getId());
        response.setAssignee(task.getAssignee());
        response.setData(task);
    }

    private void SubmitUserTask(Workflow message, Workflow response) throws IOException {
        log.debug("3.1 Submitting User Task");

        this.camundaService.postUserTasks(cookie,message);
        if(camundaService.checkIfFinished(cookie,message)) {
            log.debug("3.1.1 Finished ");
            response.setStatus(Status.FINISHED);
        } else {
            log.debug("3.1.2 Next User Task ");
            response.setForm( camundaService.getUserTasks(cookie,message.getTaskId()));
            response.setStatus(Status.TASK);
        }
    }

}
