package es.minstrel.app.model.services;

import es.minstrel.app.model.entities.User;
import es.minstrel.app.model.entities.UserDao;
import es.minstrel.app.model.exceptions.DuplicateInstanceException;
import es.minstrel.app.model.exceptions.IncorrectLoginException;
import es.minstrel.app.model.exceptions.IncorrectPasswordException;
import es.minstrel.app.model.exceptions.InstanceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private PermissionChecker permissionChecker;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private UserDao userDao;

    @Override
    @Transactional(readOnly = true)
    public User login(String userName, String password) throws IncorrectLoginException {

        Optional<User> user = userDao.findByUserName(userName);

        if (user.isEmpty()) {
            throw new IncorrectLoginException(userName, password);
        }

        if (!passwordEncoder.matches(password, user.get().getPassword())) {
            throw new IncorrectLoginException(userName, password);
        }

        return user.get();
    }

    @Override
    @Transactional(readOnly = true)
    public User loginFromId(Long id) throws InstanceNotFoundException {
        return permissionChecker.checkUser(id);
    }

    @Override
    public User updateUser(Long id, String userName, String firstName, String lastName)
            throws InstanceNotFoundException, DuplicateInstanceException {

        User user = permissionChecker.checkUser(id);

        if (!user.getUserName().equals(userName)) {
            if (userDao.existsByUserName(userName)) {
                throw new DuplicateInstanceException("project.entities.user", userName);
            }
        }

        user.setUserName(userName);
        user.setFirstName(firstName);
        user.setLastName(lastName);

        return user;

    }

    @Override
    public void changePassword(Long id, String oldPassword, String newPassword)
            throws InstanceNotFoundException, IncorrectPasswordException {

        User user = permissionChecker.checkUser(id);

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new IncorrectPasswordException();
        } else {
            user.setPassword(passwordEncoder.encode(newPassword));
        }
    }
}
