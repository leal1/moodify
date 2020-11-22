package com.example.moodifyserver.controller;

import com.example.moodifyserver.service.PlaylistService;
import com.wrapper.spotify.model_objects.specification.PlaylistSimplified;
import io.swagger.annotations.Api;
import jdk.nashorn.internal.objects.annotations.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingRequestHeaderException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/playlists")
public class PlaylistController {
    @Autowired
    private PlaylistService playlistService;

    @GetMapping

    public ResponseEntity<PlaylistSimplified[]> getCurUserPlaylists(@RequestHeader(value ="accessToken") String accessToken) {
        try{
            return new ResponseEntity<>(playlistService.getCurrentUsersPlaylists(accessToken),HttpStatus.OK);
        }
        catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
