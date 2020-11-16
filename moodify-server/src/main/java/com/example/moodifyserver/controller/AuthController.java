package com.example.moodifyserver.controller;

import com.example.moodifyserver.service.AuthURIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.net.URISyntaxException;
import java.util.concurrent.CancellationException;
import java.util.concurrent.CompletionException;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    @Autowired
    private AuthURIService authURIService;

    @GetMapping("/redirect")
    public ResponseEntity<Object> redirectExternalURL() {
        try {
            return new ResponseEntity<>(authURIService.authorizationCodeUri_Async(), HttpStatus.OK);
        } catch (URISyntaxException e) {
            return new ResponseEntity<>("Wrong URI Snytax", HttpStatus.BAD_REQUEST);
        } catch (CompletionException e) {
            return new ResponseEntity<>("Async operation canceled", HttpStatus.BAD_REQUEST);
        } catch (CancellationException e) {
            return new ResponseEntity<>("Async operation canceled", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
