package com.example.moodifyserver.service;

import com.wrapper.spotify.SpotifyApi;
import com.wrapper.spotify.model_objects.specification.Track;
import com.wrapper.spotify.requests.data.tracks.GetSeveralTracksRequest;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Service
public class TrackService {
    public Track[] getSeveralTracks(String accessToken, String[] ids) {
        SpotifyApi spotifyApi = new SpotifyApi.Builder()
            .setAccessToken(accessToken)
            .build();

        GetSeveralTracksRequest getSeveralTracksRequest = spotifyApi.getSeveralTracks(ids)
//          .market(CountryCode.SE)
            .build();
        final CompletableFuture<Track[]> tracksFuture = getSeveralTracksRequest.executeAsync();
        // Thread free to do other tasks...

        // Example Only. Never block in production code.
        return tracksFuture.join();
    }
}
