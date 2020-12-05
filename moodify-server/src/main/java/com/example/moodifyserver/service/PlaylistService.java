package com.example.moodifyserver.service;

import com.wrapper.spotify.SpotifyApi;
import com.wrapper.spotify.model_objects.special.SnapshotResult;
import com.wrapper.spotify.model_objects.specification.Paging;
import com.wrapper.spotify.model_objects.specification.PlaylistSimplified;
import com.wrapper.spotify.requests.data.playlists.AddItemsToPlaylistRequest;
import com.wrapper.spotify.requests.data.playlists.GetListOfCurrentUsersPlaylistsRequest;
import org.springframework.stereotype.Service;
import java.util.concurrent.CompletableFuture;

@Service
public class PlaylistService {
    public PlaylistSimplified[] getCurrentUsersPlaylists(String accessToken) {
        final SpotifyApi spotifyApi = new SpotifyApi.Builder()
            .setAccessToken(accessToken)
            .build();

        final GetListOfCurrentUsersPlaylistsRequest getListOfCurrentUsersPlaylistsRequest = spotifyApi
            .getListOfCurrentUsersPlaylists()
//          .limit(10)
//          .offset(0)
            .build();

        final CompletableFuture<Paging<PlaylistSimplified>> pagingFuture = getListOfCurrentUsersPlaylistsRequest.executeAsync();
        final Paging<PlaylistSimplified> playlistSimplifiedPaging = pagingFuture.join();
        return playlistSimplifiedPaging.getItems();
    }

    public void addCurrentSongToPlaylist(String accessToken, String playlistID, String[] spotifyURI) {
        final String[] uris = spotifyURI;

        final SpotifyApi spotifyApi = new SpotifyApi.Builder()
                .setAccessToken(accessToken)
                .build();
        AddItemsToPlaylistRequest addItemsToPlaylistRequest = spotifyApi
                .addItemsToPlaylist(playlistID, uris)
                .build();

        final CompletableFuture<SnapshotResult> snapshotResultFuture = addItemsToPlaylistRequest.executeAsync();
        // Thread free to do other tasks...
        // Example Only. Never block in production code.
        final SnapshotResult snapshotResult = snapshotResultFuture.join();
    }

}
