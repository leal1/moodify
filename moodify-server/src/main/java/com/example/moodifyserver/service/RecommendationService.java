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

    public TrackSimplified[] getSongRecommendation(String accessToken) {
        SpotifyApi spotifyApi = new SpotifyApi.Builder()
                .setAccessToken(accessToken)
                .build();

        GetRecommendationsRequest recRequest = recRequest(spotifyApi, "Happy");

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

        if (mood.equals("Happy")) {
            recRequest
                    .min_danceability(.7f)
                    .min_energy(.7f)
                    .min_valence(.66f);
        }


        return recRequest.build();
    }

}
