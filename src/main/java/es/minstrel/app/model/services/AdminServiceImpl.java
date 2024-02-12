package es.minstrel.app.model.services;

import es.minstrel.app.model.entities.*;
import es.minstrel.app.model.exceptions.DuplicateInstanceException;
import es.minstrel.app.model.exceptions.InstanceNotFoundException;
import es.minstrel.app.model.exceptions.PermissionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {

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

    private void addRolesToUser(User user, List<Long> rolesIds) throws InstanceNotFoundException, PermissionException {

        Optional<Rol> rol;
        UserRol userRol;

        for (Long id : rolesIds) {
            rol = rolDao.findById(id);

            if (rol.isEmpty())
                throw new InstanceNotFoundException("project.entities.rol", id);

            if (rol.get().getRole().equals("ADMIN"))
                throw new PermissionException();

            userRol = new UserRol(user, rol.get());
            user.addUserRol(userRol);
            rol.get().addUserRol(userRol);
            userRolDao.save(userRol);
        }

    }

    private void deleteAllRolesToUser(User user) {

        for (UserRol userRol : user.getUserRols()) {

            userRol.getRol().removeUserRol(userRol);
            userRolDao.delete(userRol);
            userRolDao.flush();
        }

        user.removeAllUserRol();

    }

    @Override
    public Block<User> getAllUser(int page, int size) {

        Slice<User> users = userDao.findAll(PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "userName")));

        return new Block<>(users.getContent(), users.hasNext());
    }

    @Override
    public List<Rol> getAllRoles() {

        return rolDao.findAll(Sort.by(Sort.Direction.ASC, "role"));
    }

    @Override
    public void createUser(User user, List<Long> rolesIds) throws DuplicateInstanceException, InstanceNotFoundException, PermissionException {

        if (userDao.existsByUserName(user.getUserName())) {
            throw new DuplicateInstanceException("project.entities.user", user.getUserName());
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userDao.save(user);

        addRolesToUser(user, rolesIds);

    }

    @Override
    public void updateUser(Long id, String userName, String firstName, String lastName, List<Long> rolesIds)
            throws InstanceNotFoundException, DuplicateInstanceException, PermissionException {

        User user = permissionChecker.checkUser(id);

        if (permissionChecker.checkUserIsAdmin(id))
            throw new PermissionException();

        if (!user.getUserName().equals(userName)) {
            if (userDao.existsByUserName(userName)) {
                throw new DuplicateInstanceException("project.entities.user", userName);
            }
        }

        user.setUserName(userName);
        user.setFirstName(firstName);
        user.setLastName(lastName);

        deleteAllRolesToUser(user);
        addRolesToUser(user, rolesIds);

    }

    @Override
    public void deleteUser(Long id) throws InstanceNotFoundException, PermissionException {

        User user = permissionChecker.checkUser(id);

        if (permissionChecker.checkUserIsAdmin(id))
            throw new PermissionException();

        deleteAllRolesToUser(user);
        userDao.delete(user);
    }
}
