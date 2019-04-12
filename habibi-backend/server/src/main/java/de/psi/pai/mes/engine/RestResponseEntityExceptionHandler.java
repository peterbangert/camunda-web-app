package de.psi.pai.mes.engine;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.io.IOException;

@Slf4j
@ControllerAdvice(basePackages = {"de.psi.pai.mes.engine.camunda", "de.psi.pai.mes.engine.websocket" })
public class RestResponseEntityExceptionHandler
        extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = { HttpClientErrorException.class })
    protected ResponseEntity<Object> handleConflict(
            HttpClientErrorException ex, WebRequest request) {
        return new ResponseEntity<>(ex.getResponseBodyAsString(), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(value = {IOException.class })
    protected ResponseEntity<Object> handleConflict(
            IOException ex, WebRequest request) {
        return new ResponseEntity<>("Content Not Found", HttpStatus.NOT_FOUND);
    }
}