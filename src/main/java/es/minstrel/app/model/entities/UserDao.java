package es.minstrel.app.model.entities;

import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.Optional;

public interface UserDao extends PagingAndSortingRepository<User, Long> {

    Optional<User> findByUserName(String userName);
}
