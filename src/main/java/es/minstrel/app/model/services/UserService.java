package es.minstrel.app.model.services;

import es.minstrel.app.model.entities.User;
import es.minstrel.app.model.exceptions.DuplicateInstanceException;
import es.minstrel.app.model.exceptions.IncorrectLoginException;
import es.minstrel.app.model.exceptions.IncorrectPasswordException;
import es.minstrel.app.model.exceptions.InstanceNotFoundException;

public interface UserService {

    User login(String userName, String password)
            throws IncorrectLoginException;

    User loginFromId(Long id)
            throws InstanceNotFoundException;

    User updateUser(Long id, String userName, String firstname, String lastName)
            throws InstanceNotFoundException, DuplicateInstanceException;

    void changePassword(Long id, String oldPassword, String newPassword)
            throws InstanceNotFoundException, IncorrectPasswordException;
}
