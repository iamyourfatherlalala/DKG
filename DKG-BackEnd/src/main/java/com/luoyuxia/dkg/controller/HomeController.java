package com.luoyuxia.dkg.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/")
public class HomeController {
    private static Logger logger = LoggerFactory.getLogger(HomeController.class);
    @RequestMapping("/")
    public ResponseEntity home() {
        Map<String, String> map = new HashMap<>();
        map.put("name", "DKG");
        return new ResponseEntity<>(map, HttpStatus.OK);
    }
}
