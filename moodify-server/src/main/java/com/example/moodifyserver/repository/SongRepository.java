package com.example.moodifyserver.repository;

import com.example.moodifyserver.model.Song;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SongRepository extends JpaRepository<Song,String> {

}
