package com.example.moodifyserver.repository;

import com.example.moodifyserver.model.Song;
import com.example.moodifyserver.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface UserRepository extends JpaRepository<User,String> {
//    @Query("Select u.savedSongs FROM User u JOIN u.savedSongs WHERE u.id =:id")
//    List<Song> findSongs( @Param("id") String id);
    @Query("Select u.savedSongs FROM User u JOIN u.savedSongs WHERE u.id =:id")
    Set<Song> getUserSongs(@Param("id") String id);
}
