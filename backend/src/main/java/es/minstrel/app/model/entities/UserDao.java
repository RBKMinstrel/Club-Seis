package es.minstrel.app.model.entities;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserDao extends JpaRepository<User, Long> {

    boolean existsByUserName(String userName);

    Optional<User> findByUserName(String userName);
}
