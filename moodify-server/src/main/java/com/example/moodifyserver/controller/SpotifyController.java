package com.example.moodifyserver.controller;

import com.example.moodifyserver.service.FaceRecognitionService;
import com.example.moodifyserver.service.PlaylistService;
import com.example.moodifyserver.service.RecommendationService;
import com.example.moodifyserver.service.SDKPlayerService;
import com.wrapper.spotify.model_objects.IPlaylistItem;
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
    @Autowired
    private SDKPlayerService sdkPlayerService;

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
    @PostMapping("/playlists/{playlistID}/song")
        public ResponseEntity<Void> addCurrentSongToPlaylist(@RequestHeader(value ="Authorization") String accessToken,
                                                               @RequestParam(value="uri")  String[] URI,
                                                               @PathVariable("playlistID") String playlistID)
                                                                {
        try{
            final String accessTokenTrim = accessToken.substring(7);
            playlistService.addCurrentSongToPlaylist(accessTokenTrim,playlistID,URI);
            return new ResponseEntity<>(HttpStatus.OK);
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

    @GetMapping("/player/currently-playing")
    public ResponseEntity<IPlaylistItem> getUsersCurrentlyPlayingSong(@RequestHeader(value = "Authorization") String accessToken) {
        try {
            final String accessTokenTrim = accessToken.substring(7);
            return new ResponseEntity<>(sdkPlayerService.getUsersCurrentlyPlayingTrack(accessTokenTrim), HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    @PostMapping("/player/queue")
    public ResponseEntity<String> addSongToQueue(@RequestHeader(value = "Authorization") String accessToken,
                                               @RequestHeader(value = "deviceID") String deviceID,
                                               @RequestBody() String trackURI ) {
        try {
            final String accessTokenTrim = accessToken.substring(7);
            return new ResponseEntity<>(sdkPlayerService.addSongToPlayer(accessTokenTrim, deviceID, trackURI), HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("/player/start/{deviceID}")
    public ResponseEntity<Void> startUserPlayback(@RequestHeader(value = "Authorization") String accessToken,
                                                 @RequestBody String trackURI,
                                                 @PathVariable("deviceID") String deviceID) {
        try {
            final String accessTokenTrim = accessToken.substring(7);
            sdkPlayerService.startUserPlayback(accessTokenTrim,deviceID,trackURI);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/player/resume/{deviceID}")
    public ResponseEntity<Void> startUserPlayback(@RequestHeader(value = "Authorization") String accessToken,
                                                    @PathVariable("deviceID") String deviceID) {
        try {
            final String accessTokenTrim = accessToken.substring(7);
            sdkPlayerService.resumeUserPlayback(accessTokenTrim, deviceID);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/player/pause/{deviceID}")
    public ResponseEntity<Void> pauseUserPlayback(@RequestHeader(value = "Authorization") String accessToken,
                                                    @PathVariable("deviceID") String deviceID) {
        try {
            final String accessTokenTrim = accessToken.substring(7);
            sdkPlayerService.pauseUserPlayback(accessTokenTrim, deviceID);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
