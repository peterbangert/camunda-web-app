package de.psi.pai.mes.engine.camunda.model;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;


@Slf4j
@Data
@Configuration
@EnableConfigurationProperties
@ConfigurationProperties(prefix="camunda.claim-task-payload")
public class ClaimTaskPayload {

    private String userId;
    private String user;

    public String convertToJson() throws IOException {

        return "{\"" + this.getUserId()+"\":\""+ this.getUser() + "\"}";
    }
}
