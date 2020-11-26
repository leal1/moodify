package com.example.moodifyserver.controller;

import com.example.moodifyserver.service.FaceRecognitionService;
import com.example.moodifyserver.service.PlaylistService;
import com.example.moodifyserver.service.RecommendationService;
import com.wrapper.spotify.model_objects.specification.PlaylistSimplified;
import com.wrapper.spotify.model_objects.specification.TrackSimplified;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/spotify")
public class SpotifyController {
    @Autowired
    private PlaylistService playlistService;
    @Autowired
    private RecommendationService rs;
    @Autowired
    private FaceRecognitionService faceRecognitionService;

    @GetMapping("/playlists")
    public ResponseEntity<PlaylistSimplified[]> getCurUserPlaylists(@RequestHeader(value ="Authorization") String accessToken) {
        try{
            final String accessTokenTrim = accessToken.substring(7);
            return new ResponseEntity<>(playlistService.getCurrentUsersPlaylists(accessTokenTrim), HttpStatus.OK);
        }
        catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/recommendations")
    public ResponseEntity<TrackSimplified[]> getSongRecommendations(@RequestHeader(value = "Authorization") String accessToken){
        try {
            return new ResponseEntity<>(rs.getSongRecommendation(accessToken.substring(7)), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
