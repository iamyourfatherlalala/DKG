package com.luoyuxia.dkg.controller;

import com.luoyuxia.dkg.domain.entity.User;
import com.luoyuxia.dkg.jwt.JwtAuthenticationRequest;
import com.luoyuxia.dkg.jwt.JwtAuthenticationResponse;
import com.luoyuxia.dkg.service.abs.AuthService;
import com.luoyuxia.dkg.service.abs.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/")
public class HomeController {
    @Autowired
    private UserService userService;
    @Autowired
    private AuthService authService;
    private static Logger logger = LoggerFactory.getLogger(HomeController.class);
    @RequestMapping("")
    public ResponseEntity home() {
        Map<String, String> map = new HashMap<>();
        map.put("name", "DKG");
        return new ResponseEntity<>(map, HttpStatus.OK);
    }
    @RequestMapping(value = "/auth", method = RequestMethod.POST)
    public ResponseEntity auth(@RequestBody JwtAuthenticationRequest authenticationRequest) {
        final String token = authService.login(authenticationRequest.getUsername(),
                authenticationRequest.getPassword());
        JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse(token);
        return new ResponseEntity<>(jwtAuthenticationResponse, HttpStatus.OK);
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity register(@RequestBody User addedUser) {
        if (userService.register(addedUser) != null) {
            return new ResponseEntity<>(true, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }
}
