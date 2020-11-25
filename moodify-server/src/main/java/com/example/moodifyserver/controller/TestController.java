package com.example.moodifyserver.controller;

import com.example.moodifyserver.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/test")
public class TestController {
    @Autowired
    private TestService testService;

    @GetMapping("/userProfile")
    public ResponseEntity<Map<String,String>> getUserProfile(@RequestHeader(value = "Authorization") String accessToken) {
        try{
//            throw new Exception();
            System.out.println(accessToken);
            final String accessTokenTrim = accessToken.substring(7);
            return new ResponseEntity<>(testService.getUserProfile(accessTokenTrim), HttpStatus.OK);
        }
        catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/sendToken")
    public ResponseEntity<String> sendToken(@RequestHeader(value = "Authorization") String accessToken) {
        try{
            System.out.println(accessToken);
            final String accessTokenTrim = accessToken.substring(7);
            return new ResponseEntity<>(accessTokenTrim, HttpStatus.OK);
        }
        catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/sendScreenshot")
    public ResponseEntity<String> sendScreenshot(@RequestHeader(value = "Authorization") String accessToken,
                                                 @RequestBody String screenShot) {
        try{
            System.out.println(screenShot);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
