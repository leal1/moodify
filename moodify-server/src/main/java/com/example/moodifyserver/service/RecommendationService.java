package com.example.moodifyserver.service;

import com.neovisionaries.i18n.CountryCode;
import com.wrapper.spotify.SpotifyApi;
import com.wrapper.spotify.model_objects.specification.Recommendations;
import com.wrapper.spotify.model_objects.specification.TrackSimplified;
import com.wrapper.spotify.requests.data.browse.GetRecommendationsRequest;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Service
public class RecommendationService {
    int numSongs = 9;

    // mood is one of 4 "HAPPY", "SAD", "ANGRY", or "CALM"
    public TrackSimplified[] getSongRecommendation(String accessToken, String mood) {
        SpotifyApi spotifyApi = new SpotifyApi.Builder()
                .setAccessToken(accessToken)
                .build();

        GetRecommendationsRequest recRequest = recRequest(spotifyApi, mood);

        final CompletableFuture<Recommendations> recommendationsFuture = recRequest.executeAsync();

        // Thread free to do other tasks...

        // Example Only. Never block in production code.
        Recommendations rec = recommendationsFuture.join();
        return rec.getTracks();
    }

    GetRecommendationsRequest recRequest(SpotifyApi spotifyApi, String mood) {
        GetRecommendationsRequest.Builder recRequest = spotifyApi.getRecommendations()
                .max_liveness(.5f)
                .max_speechiness(.66f)
//                .max_popularity(50)
                .min_popularity(30);

        // Can try to seed author/genre/song tracks based either on user history OR chosen songs
        if (mood.equals("HAPPY")) {
            recRequest
                    .min_danceability(.7f)
                    .min_energy(.7f)
                    .min_valence(.66f);
        } else if (mood.equals("SAD")) {
            recRequest
                    .min_danceability(.7f)
                    .max_energy(.4f)
                    .max_valence(.33f);
        } else if (mood.equals("CALM")) {
            recRequest
                    .max_danceability(.3f)
                    .max_energy(.4f)
                    .max_loudness(.8f)
                    .max_tempo(100f)
                    .min_acousticness(.7f)
                    .min_valence(.33f)
                    .max_valence(.66f);
        } else if (mood.equals("ANGRY")) {
            recRequest
                    .max_danceability(.3f)
                    .max_energy(.4f)
                    .min_tempo(100f)
                    .max_valence(.33f);
        }

        return recRequest.build();
    }

}
