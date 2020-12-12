package com.example.moodifyserver.controller;

import com.example.moodifyserver.service.FaceRecognitionService;
import org.apache.hc.core5.net.URIBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/rekognition")
public class FaceRecognitionController {
    @Autowired
    private FaceRecognitionService faceRecognitionService;

    @PostMapping("/photo")
    public ResponseEntity<String> getMood(@RequestBody String photo) {
        try{
            return new ResponseEntity<>(faceRecognitionService.getMood(photo),HttpStatus.OK);
        }
        catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
