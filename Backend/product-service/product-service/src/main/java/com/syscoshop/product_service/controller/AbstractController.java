package com.syscoshop.product_service.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public abstract class AbstractController {

    public static final String BASE_PATH = "/api/v1/products";

    protected final Logger logger = LoggerFactory.getLogger(getClass());

    protected <T> ResponseEntity<T> buildSuccessResponse(T body){
        return ResponseEntity.ok(body);
    }

}
