package com.mynx.myca500.commons.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/status")
public class StatusController {

    @GetMapping("/app")
    public String getAppStatus(){
        return "{\"message\": \"I am up, for sure\"}";
    }

    @GetMapping("/db")
    public String getDbStatus(){
        // add sample query to do SELECT 1 and return response
        return "{\"message\": \"DB is up\"}";
    }
}
