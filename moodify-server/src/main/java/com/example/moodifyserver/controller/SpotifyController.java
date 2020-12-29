package com.example.moodifyserver.controller;

import com.example.moodifyserver.model.Song;
import com.example.moodifyserver.service.*;
import com.wrapper.spotify.model_objects.IPlaylistItem;
import com.wrapper.spotify.model_objects.specification.PlaylistSimplified;
import com.wrapper.spotify.model_objects.specification.Track;
import com.wrapper.spotify.model_objects.specification.TrackSimplified;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Set;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/spotify")
public class SpotifyController {

    private final PlaylistService playlistService;
    private final RecommendationService rs;
    private final SDKPlayerService sdkPlayerService;
    private final TrackService trackService;
    private final UserProfileService userProfileService;
    private final UserService userService;

    @GetMapping("/user/{id}/songs")
    public ResponseEntity<Set<Song>> getSongsFromUser(@PathVariable String id) {
        try {
            return new ResponseEntity<>(userService.getSongsFromUser(id),HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/user/{id}/song")
    public ResponseEntity<Void> addSongToUser(@PathVariable String id, @RequestBody Song song) {
        try {
            userService.addSongToUser(id,song);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @DeleteMapping("/user/{id}/song/{songId}")
    public ResponseEntity<Void> deleteSongFromUser(@PathVariable String id, @PathVariable String songId) {
        try {
            userService.deleteSongFromUser(id,songId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/user")
    public ResponseEntity<Void> addUser(@RequestBody com.example.moodifyserver.model.User newUser) {
        try {
            userService.addUser(newUser);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/userProfile")
    public ResponseEntity<Map<String,String>> getUserProfile(@RequestHeader(value = "Authorization") String accessToken) {
        try {
            final String accessTokenTrim = accessToken.substring(7);
            return new ResponseEntity<>(userProfileService.getUserProfile(accessTokenTrim), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

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
                                                             @PathVariable("playlistID") String playlistID) {
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
    public ResponseEntity<TrackSimplified[]> getSongRecommendations(@RequestHeader(value = "Authorization") String accessToken,
                                                                    @RequestParam(value = "mood") String mood){
        try {
            return new ResponseEntity<>(rs.getSongRecommendation(accessToken.substring(7), mood), HttpStatus.OK);
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
    public ResponseEntity<Void> addSongToQueue(@RequestHeader(value = "Authorization") String accessToken,
                                               @RequestParam(value = "deviceID") String deviceID,
                                               @RequestParam(value = "uri") String trackURI) {
        try {
            final String accessTokenTrim = accessToken.substring(7);
            sdkPlayerService.addSongToPlayer(accessTokenTrim, deviceID, trackURI);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/player/next")
    public ResponseEntity<Void> skipNextSongPlayer(@RequestHeader(value = "Authorization") String accessToken,
                                                 @RequestParam(value = "deviceID") String deviceID){
        try {
            final String accessTokenTrim = accessToken.substring(7);
            sdkPlayerService.skipNextSongPlayer(accessTokenTrim, deviceID);
            return new ResponseEntity<>( HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/player/prev")
    public ResponseEntity<Void> prevSongPlayer(@RequestHeader(value = "Authorization") String accessToken,
                                                 @RequestParam(value = "deviceID") String deviceID) {
        try {
            final String accessTokenTrim = accessToken.substring(7);
            sdkPlayerService.prevSongPlayer(accessTokenTrim, deviceID);
            return new ResponseEntity<>( HttpStatus.OK);
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
    @GetMapping("/tracks")
    public ResponseEntity<Track[]> getSeveralTracks(@RequestHeader(value ="Authorization") String accessToken,
                                                    @RequestParam(value = "ids") String[] ids) {
        try{
            final String accessTokenTrim = accessToken.substring(7);
            return new ResponseEntity<>(trackService.getSeveralTracks(accessTokenTrim, ids), HttpStatus.OK);
        }
        catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
