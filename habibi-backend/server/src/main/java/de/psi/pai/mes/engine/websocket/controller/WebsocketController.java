package de.psi.pai.mes.engine.websocket.controller;


import de.psi.pai.mes.engine.websocket.model.Workflow;
import de.psi.pai.mes.engine.websocket.service.WebsocketService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;


@Controller
@Slf4j
public class WebsocketController {

    private final SimpMessagingTemplate template;
    private WebsocketService service;

    @Autowired
    WebsocketController(SimpMessagingTemplate template, WebsocketService service) {
        this.service = service;
        this.template = template;
    }

    @MessageMapping("/send/message")
    public void onRecievedMessage( Workflow message, SimpMessageHeaderAccessor  headerAccessor ) {

        String sessionId = headerAccessor.getSessionAttributes().get("cookie")
                .toString()
                .replaceAll("\\[", "")
                .replaceAll("\\]","");
        log.debug("1 Recieved Message : {}", message.toString());

        this.template.convertAndSend("/chat", service.handleMessage(sessionId, message));
    }

}
