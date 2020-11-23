package com.example.moodifyserver.controller;

import com.example.moodifyserver.service.RecommendationService;
import com.wrapper.spotify.model_objects.specification.TrackSimplified;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/rec")
public class RecommendationController {

    @Autowired
    private RecommendationService rs;

    @GetMapping("/getRec")
    public ResponseEntity<TrackSimplified[]> getSongRecommendations(@RequestHeader(value = "Authorization") String accessToken) {
        try {
            return new ResponseEntity<>(rs.getSongRecommendation(accessToken.substring(7)), HttpStatus.OK);
        } catch (Exception e) {

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}