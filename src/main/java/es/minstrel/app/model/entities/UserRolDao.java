package es.minstrel.app.model.entities;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRolDao extends JpaRepository<UserRol, Long> {

    void deleteByUserIs(User user);
}
