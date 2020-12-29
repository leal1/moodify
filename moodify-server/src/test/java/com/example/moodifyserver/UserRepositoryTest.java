package com.example.moodifyserver;

import com.example.moodifyserver.model.Song;
import com.example.moodifyserver.model.User;
import com.example.moodifyserver.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;
import sun.jvm.hotspot.utilities.Assert;


import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.util.Collection;
import java.util.List;
import java.util.Set;
//@RunWith(SpringRunner.class)
@DataJpaTest
public class UserRepositoryTest {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TestEntityManager testEntityManager;
    @Autowired
    private EntityManager entityManager;

    @Test
    public void testGetSongs() {
        TypedQuery<Song> query =
                entityManager.createQuery(
                        "Select s From User u Join u.savedSongs s", Song.class);
        List<Song> resultList = query.getResultList();
        Assert.that(resultList.size() > 0,"test");

  //      Set<Song> songs = userRepository.findById("peterle125").get().getSavedSongs();




    }
}
