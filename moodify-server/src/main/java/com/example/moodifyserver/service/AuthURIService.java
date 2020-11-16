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
import java.util.concurrent.CancellationException;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionException;
@Service
public class AuthURIService {


    private static final URI redirectUri = SpotifyHttpManager.makeUri("http://localhost:3000/LandingPage");
    private static final String code = "";

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

    private static final AuthorizationCodeRequest authorizationCodeRequest = spotifyApi.authorizationCode(code)
            .build();

    public URI authorizationCodeUri_Async() throws CompletionException, CancellationException, URISyntaxException {
        final CompletableFuture<URI> uriFuture = authorizationCodeUriRequest.executeAsync();
        // Example Only. Never block in production code.
        final URI uri = uriFuture.join();
        System.out.println("URI: " + uri.toString());
        return uri;
    }

    public void authorizationCode_Async() throws CompletionException, CancellationException {
        final CompletableFuture<AuthorizationCodeCredentials> authorizationCodeCredentialsFuture = authorizationCodeRequest.executeAsync();
        // Example Only. Never block in production code.
        final AuthorizationCodeCredentials authorizationCodeCredentials = authorizationCodeCredentialsFuture.join();
        // Set access and refresh token for further "spotifyApi" object usage
        spotifyApi.setAccessToken(authorizationCodeCredentials.getAccessToken());
        spotifyApi.setRefreshToken(authorizationCodeCredentials.getRefreshToken());
        System.out.println("Expires in: " + authorizationCodeCredentials.getExpiresIn());
    }
}