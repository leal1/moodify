package com.example.moodifyserver.service;

import com.google.gson.JsonParser;
import com.neovisionaries.i18n.CountryCode;
import com.wrapper.spotify.SpotifyApi;
import com.wrapper.spotify.model_objects.IPlaylistItem;
import com.wrapper.spotify.model_objects.miscellaneous.CurrentlyPlaying;
import com.wrapper.spotify.requests.data.player.*;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Service
public class SDKPlayerService {
    public void prevSongPlayer(String accessToken, String deviceId) {
        final SpotifyApi spotifyApi = new SpotifyApi.Builder()
                .setAccessToken(accessToken)
                .build();

        final SkipUsersPlaybackToPreviousTrackRequest skipUsersPlaybackToPreviousTrackRequest = spotifyApi
                .skipUsersPlaybackToPreviousTrack()
                .device_id(deviceId)
                .build();

        final CompletableFuture<String> stringFuture = skipUsersPlaybackToPreviousTrackRequest.executeAsync();
        final String string = stringFuture.join();
    }
    public void skipNextSongPlayer(String accessToken, String deviceId) {
        final SpotifyApi spotifyApi = new SpotifyApi.Builder()
                .setAccessToken(accessToken)
                .build();

        final SkipUsersPlaybackToNextTrackRequest skipUsersPlaybackToNextTrackRequest = spotifyApi
                .skipUsersPlaybackToNextTrack()
                .device_id(deviceId)
                .build();

        final CompletableFuture<String> stringFuture = skipUsersPlaybackToNextTrackRequest.executeAsync();
        final String string = stringFuture.join();
    }

    public void addSongToPlayer(String accessToken, String deviceID, String trackURI) {
        final SpotifyApi spotifyApi = new SpotifyApi.Builder()
            .setAccessToken(accessToken)
            .build();
        final AddItemToUsersPlaybackQueueRequest addItemToUsersPlaybackQueueRequest = spotifyApi
            .addItemToUsersPlaybackQueue(trackURI)
            .device_id(deviceID)
            .build();
        final CompletableFuture<String> stringFuture = addItemToUsersPlaybackQueueRequest.executeAsync();
        final String string = stringFuture.join();
    }
    public void startUserPlayback(String accessToken, String deviceId, String trackURI) {
        final SpotifyApi spotifyApi = new SpotifyApi.Builder()
            .setAccessToken(accessToken)
            .build();

        final StartResumeUsersPlaybackRequest startResumeUsersPlaybackRequest = spotifyApi.startResumeUsersPlayback()
            .device_id(deviceId)
            .uris(JsonParser.parseString("[\""+trackURI+"\"]").getAsJsonArray())
            .build();

        final CompletableFuture<String> stringFuture = startResumeUsersPlaybackRequest.executeAsync();
        final String string = stringFuture.join();
    }
    public void resumeUserPlayback(String accessToken, String deviceId) {
        final SpotifyApi spotifyApi = new SpotifyApi.Builder()
            .setAccessToken(accessToken)
            .build();

        final StartResumeUsersPlaybackRequest startResumeUsersPlaybackRequest = spotifyApi.startResumeUsersPlayback()
            .device_id(deviceId)
            .build();

        final CompletableFuture<String> stringFuture = startResumeUsersPlaybackRequest.executeAsync();
        final String string = stringFuture.join();
    }

    public void pauseUserPlayback(String accessToken, String deviceId) {
        final SpotifyApi spotifyApi = new SpotifyApi.Builder()
            .setAccessToken(accessToken)
            .build();

        final PauseUsersPlaybackRequest pauseUsersPlaybackRequest = spotifyApi.pauseUsersPlayback()
            .device_id(deviceId)
            .build();
        final CompletableFuture<String> stringFuture = pauseUsersPlaybackRequest.executeAsync();
        final String string = stringFuture.join();
    }

    public IPlaylistItem getUsersCurrentlyPlayingTrack(String accessToken) {
        final SpotifyApi spotifyApi = new SpotifyApi.Builder()
            .setAccessToken(accessToken)
            .build();
        final GetUsersCurrentlyPlayingTrackRequest getUsersCurrentlyPlayingTrackRequest = spotifyApi
            .getUsersCurrentlyPlayingTrack()
            .market(CountryCode.US)
//          .additionalTypes("track,episode")
            .build();
        final CompletableFuture<CurrentlyPlaying> currentlyPlayingFuture = getUsersCurrentlyPlayingTrackRequest.executeAsync();

        // Thread free to do other tasks...

        // Example Only. Never block in production code.
        final CurrentlyPlaying currentlyPlaying = currentlyPlayingFuture.join();

        return currentlyPlaying.getItem();
    }
}
