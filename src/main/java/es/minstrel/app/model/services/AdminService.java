package es.minstrel.app.model.services;

import es.minstrel.app.model.entities.Rol;
import es.minstrel.app.model.entities.User;
import es.minstrel.app.model.exceptions.DuplicateInstanceException;
import es.minstrel.app.model.exceptions.InstanceNotFoundException;
import es.minstrel.app.model.exceptions.PermissionException;

import java.util.List;

public interface AdminService {

    Block<User> getAllUser(int page, int size);

    List<Rol> getAllRoles();

    User getUserById(Long id) throws InstanceNotFoundException;

    void createUser(User user, List<Long> rolesIds)
            throws InstanceNotFoundException, DuplicateInstanceException, PermissionException;

    void updateUser(Long id, String userName, String firstname, String lastName, List<Long> rolesIds)
            throws InstanceNotFoundException, DuplicateInstanceException, PermissionException;

    void deleteUser(Long id)
            throws InstanceNotFoundException, PermissionException;
}
