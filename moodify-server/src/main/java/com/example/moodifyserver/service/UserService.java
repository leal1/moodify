package com.example.moodifyserver.service;

import com.example.moodifyserver.model.Song;
import com.example.moodifyserver.model.User;
import com.example.moodifyserver.repository.SongRepository;
import com.example.moodifyserver.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.Set;


@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SongRepository songRepository;
    public void addUser(User user) {
        Optional<User> existingUser = userRepository.findById(user.getId());
        if(!existingUser.isPresent()) {
            userRepository.save(user);
        }
    }
    public void addSongToUser(String id, Song song) {
        songRepository.save(song);
        User user = userRepository.findById(id).get();
        user.getSavedSongs().add(song);
        userRepository.save(user);
    }

    public Set<Song> getSongsFromUser(String id) {
        return userRepository.findById(id).get().getSavedSongs();
    }
    public void deleteSongFromUser(String id, String songId) {
        User user = userRepository.findById(id).get();
        Song song = songRepository.findById(songId).get();
        user.getSavedSongs().remove(song);
        userRepository.save(user);
    }
}
