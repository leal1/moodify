package com.example.moodifyserver.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="spotifyUsers")
public class User implements Serializable {
    @Id
    private String id;
    private String email;
    private String name;

    @ManyToMany
    @JoinTable(
            name="user_songs",
            joinColumns = @JoinColumn(name="userId"),
            inverseJoinColumns = @JoinColumn(name="songId")
    )
    private Set<Song> savedSongs;

}
