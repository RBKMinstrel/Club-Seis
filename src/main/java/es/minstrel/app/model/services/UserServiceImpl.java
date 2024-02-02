package es.minstrel.app.model.services;

import es.minstrel.app.model.entities.Rol;
import es.minstrel.app.model.entities.User;
import es.minstrel.app.model.entities.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Override
    public User login(String userName, String password) {

        Optional<User> user = userDao.findByUserName(userName);

        //Comprobar si existe

        //Comprobar contraseña correcta

        return null;
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
        return null;
    }

    @Override
    public boolean isUserAdmin(Long id) {
        return false;
    }

    @Override
    public void createUser(User user) {

    }

    @Override
    public void updateUser(Long id, String userName, String firstname, String lastName, List<Long> rolesIds) {

    }

    @Override
    public void changePassword(Long id, String oldPassword, String newPassword) {

    }

    @Override
    public void deleteUser(Long id) {

    }
}
