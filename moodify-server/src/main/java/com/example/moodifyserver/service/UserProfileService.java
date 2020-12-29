package com.example.moodifyserver.service;

import com.wrapper.spotify.SpotifyApi;
import com.wrapper.spotify.model_objects.specification.User;
import com.wrapper.spotify.requests.data.users_profile.GetCurrentUsersProfileRequest;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
@Service
public class UserProfileService {

    public Map<String,String> getUserProfile(String accessToken) {
        Map<String,String> currentUser = new HashMap<>();
        final SpotifyApi spotifyApi = new SpotifyApi.Builder()
                .setAccessToken(accessToken)
                .build();
        final GetCurrentUsersProfileRequest getCurrentUsersProfileRequest = spotifyApi.getCurrentUsersProfile()
                .build();
        final CompletableFuture<User> userFuture = getCurrentUsersProfileRequest.executeAsync();
        // Thread free to do other tasks...
        // Example Only. Never block in production code.

        final User user = userFuture.join();
        currentUser.put("id",user.getId());
        currentUser.put("name",user.getDisplayName());
        currentUser.put("email",user.getEmail());
        return currentUser;
    }
}
