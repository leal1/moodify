package com.example.moodifyserver.controller;

import com.example.moodifyserver.service.AuthCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.Map;
import java.util.concurrent.CancellationException;
import java.util.concurrent.CompletionException;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    @Autowired
    private AuthCodeService authCodeService;

    @GetMapping("/redirect")
    public ResponseEntity<Object> redirectExternalURL() {
        try {
            return new ResponseEntity<>(authCodeService.authorizationCodeUri_Async(), HttpStatus.OK);
        } catch(URISyntaxException e) {
            return new ResponseEntity<>("Wrong URI Snytax", HttpStatus.BAD_REQUEST);
        } catch(CompletionException e) {
            return new ResponseEntity<>("Async operation canceled", HttpStatus.BAD_REQUEST);
        } catch(CancellationException e) {
            return new ResponseEntity<>("Async operation canceled", HttpStatus.BAD_REQUEST);
        } catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/callback")
    public ResponseEntity<Map<String,String>> setAuthTokens(@RequestBody String code) {
        try {
            return new ResponseEntity<>(authCodeService.authorizationCode_Async(code), HttpStatus.OK);
        }
        catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}
