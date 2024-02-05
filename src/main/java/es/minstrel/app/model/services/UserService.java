package es.minstrel.app.model.services;

import es.minstrel.app.model.entities.Rol;
import es.minstrel.app.model.entities.User;
import es.minstrel.app.model.exceptions.*;

import java.util.List;

public interface UserService {

    User login(String userName, String password)
            throws IncorrectLoginException;

    Block<User> getAllUser(int page, int size);

    List<Rol> getAllRoles();

    boolean isUserAdmin(Long id)
            throws InstanceNotFoundException;

    void createUser(User user, List<Long> rolesIds)
            throws InstanceNotFoundException, DuplicateInstanceException, PermissionException;

    User updateUser(Long id, String userName, String firstname, String lastName, List<Long> rolesIds)
            throws InstanceNotFoundException, DuplicateInstanceException, PermissionException;

    void changePassword(Long id, String oldPassword, String newPassword)
            throws InstanceNotFoundException, IncorrectPasswordException;

    void deleteUser(Long id)
            throws InstanceNotFoundException, PermissionException;
}
