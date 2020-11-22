package com.example.moodifyserver.service;

import com.example.moodifyserver.config.SpotifyConfig;
import com.wrapper.spotify.SpotifyApi;
import com.wrapper.spotify.SpotifyHttpManager;
import com.wrapper.spotify.model_objects.credentials.AuthorizationCodeCredentials;
import com.wrapper.spotify.requests.authorization.authorization_code.AuthorizationCodeRequest;
import com.wrapper.spotify.requests.authorization.authorization_code.AuthorizationCodeUriRequest;
import org.springframework.stereotype.Service;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CancellationException;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionException;

@Service
public class AuthCodeService {
    private static final URI redirectUri = SpotifyHttpManager.makeUri("http://localhost:3000/LandingPage");

    private static final SpotifyApi spotifyApi = new SpotifyApi.Builder()
            .setClientId(SpotifyConfig.clientId)
            .setClientSecret(SpotifyConfig.secretId)
            .setRedirectUri(redirectUri)
            .build();

    private static final AuthorizationCodeUriRequest authorizationCodeUriRequest = spotifyApi.authorizationCodeUri()
//          .state("x4xkmn9pu3j6ukrs8n")
            .scope("user-read-private,user-read-email")
            .show_dialog(true)
            .build();

    public URI authorizationCodeUri_Async() throws CompletionException, CancellationException, URISyntaxException {
        final CompletableFuture<URI> uriFuture = authorizationCodeUriRequest.executeAsync();
        // Example Only. Never block in production code.
        final URI uri = uriFuture.join();
        return uri;
    }

    public Map<String,String> authorizationCode_Async(String code) throws CompletionException, CancellationException {
        Map<String,String> tokens = new HashMap<>();
        AuthorizationCodeRequest authorizationCodeRequest = spotifyApi.authorizationCode(code)
                .build();
        final CompletableFuture<AuthorizationCodeCredentials> authorizationCodeCredentialsFuture = authorizationCodeRequest.executeAsync();
        // Example Only. Never block in production code.
        final AuthorizationCodeCredentials authorizationCodeCredentials = authorizationCodeCredentialsFuture.join();
        spotifyApi.setAccessToken(authorizationCodeCredentials.getAccessToken());
        spotifyApi.setRefreshToken(authorizationCodeCredentials.getRefreshToken());
        tokens.put("accessToken",spotifyApi.getAccessToken());
        tokens.put("refreshToken",spotifyApi.getRefreshToken());
        System.out.println("refresh: " + tokens.get("refreshToken"));
        System.out.println("access: " + tokens.get("accessToken"));
        return tokens;
    }
}