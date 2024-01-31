package es.minstrel.app.model.entities;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface UserDao extends PagingAndSortingRepository<User, Long> {
}
