package es.minstrel.app.model.services;

import es.minstrel.app.model.entities.*;
import es.minstrel.app.model.exceptions.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
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

    @Autowired
    private RolDao rolDao;

    @Autowired
    private UserRolDao userRolDao;

    private void addRolesToUser(User user, List<Long> rolesIds) throws InstanceNotFoundException {

        Optional<Rol> rol;

        for (Long id : rolesIds) {
            rol = rolDao.findById(id);

            if (rol.isEmpty())
                throw new InstanceNotFoundException("project.entities.user", id);

            userRolDao.save(new UserRol(user, rol.get()));
        }

    }

    @Override
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
    public List<User> getAllUser() {

        Iterable<User> users = userDao.findAll(Sort.by(Sort.Direction.ASC, "userName"));
        List<User> usersAsList = new ArrayList<>();

        users.forEach(usersAsList::add);

        return usersAsList;
    }

    @Override
    public List<Rol> getAllRoles() {

        return rolDao.findAll(Sort.by(Sort.Direction.ASC, "role"));
    }

    @Override
    public boolean isUserAdmin(Long id) throws InstanceNotFoundException {

        User user = permissionChecker.checkUser(id);

        if (user.getUserRols() != null)
            for (UserRol userRol : user.getUserRols()) {
                if (userRol.getRol().getRole().equals("ADMIN"))
                    return true;
            }

        return false;
    }

    @Override
    public void createUser(User user, List<Long> rolesIds) throws DuplicateInstanceException, InstanceNotFoundException {

        if (userDao.existsByUserName(user.getUserName())) {
            throw new DuplicateInstanceException("project.entities.user", user.getUserName());
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userDao.save(user);

        addRolesToUser(user, rolesIds);
    }

    @Override
    public void updateUser(Long id, String userName, String firstName, String lastName, List<Long> rolesIds)
            throws InstanceNotFoundException, DuplicateInstanceException {

        User user = permissionChecker.checkUser(id);

        if (!user.getUserName().equals(userName)) {
            if (userDao.existsByUserName(userName)) {
                throw new DuplicateInstanceException("project.entities.user", userName);
            }
        }

        user.setFirstName(firstName);
        user.setLastName(lastName);

        if (!isUserAdmin(id)) {
            userRolDao.deleteByUserIs(user);
            addRolesToUser(user, rolesIds);
        }

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

    @Override
    public void deleteUser(Long id) throws InstanceNotFoundException, PermissionException {

        User user = permissionChecker.checkUser(id);

        if (isUserAdmin(id))
            throw new PermissionException();

        userDao.delete(user);
    }
}
