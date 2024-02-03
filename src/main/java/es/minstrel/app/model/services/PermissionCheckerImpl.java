package es.minstrel.app.model.services;

import es.minstrel.app.model.entities.User;
import es.minstrel.app.model.entities.UserDao;
import es.minstrel.app.model.exceptions.InstanceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PermissionCheckerImpl implements PermissionChecker {

    @Autowired
    private UserDao userDao;

    @Override
    public void checkUserExists(Long userId) throws InstanceNotFoundException {

        if (!userDao.existsById(userId)) {
            throw new InstanceNotFoundException("project.entities.user", userId);
        }

    }

    @Override
    public User checkUser(Long userId) throws InstanceNotFoundException {

        Optional<User> user = userDao.findById(userId);

        if (user.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.user", userId);
        }

        return user.get();

    }

}
