package com.example.moodifyserver.service;

import com.wrapper.spotify.SpotifyApi;
import com.wrapper.spotify.model_objects.specification.Paging;
import com.wrapper.spotify.model_objects.specification.PlaylistSimplified;
import com.wrapper.spotify.requests.data.playlists.GetListOfCurrentUsersPlaylistsRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
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
        PlaylistSimplified curUserPlaylists[] = playlistSimplifiedPaging.getItems();
        return curUserPlaylists;


    }

}
