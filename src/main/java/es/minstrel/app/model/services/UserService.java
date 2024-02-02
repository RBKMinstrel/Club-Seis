package es.minstrel.app.model.services;

import es.minstrel.app.model.entities.Rol;
import es.minstrel.app.model.entities.User;

import java.util.List;

public interface UserService {

    User login(String userName, String password);

    List<User> getAllUser();

    List<Rol> getAllRoles();

    boolean isUserAdmin(Long id);

    void createUser(User user);

    void updateUser(Long id, String userName, String firstname, String lastName, List<Long> rolesIds);

    void changePassword(Long id, String oldPassword, String newPassword);

    void deleteUser(Long id);
}
