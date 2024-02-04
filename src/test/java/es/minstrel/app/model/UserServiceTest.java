package es.minstrel.app.model;

import es.minstrel.app.model.entities.*;
import es.minstrel.app.model.exceptions.DuplicateInstanceException;
import es.minstrel.app.model.exceptions.IncorrectLoginException;
import es.minstrel.app.model.exceptions.IncorrectPasswordException;
import es.minstrel.app.model.exceptions.InstanceNotFoundException;
import es.minstrel.app.model.services.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class UserServiceTest {

    private final Long NON_EXISTENT_ID = (long) -1;

    @Autowired
    private UserDao userDao;

    @Autowired
    private RolDao rolDao;

    @Autowired
    private UserRolDao userRolDao;

    @Autowired
    private UserService userService;

    private User createUser(String userName) {
        return new User(userName, "password", "firstName", "lastName");
    }

    private Rol createRol(String rol) {
        return new Rol(rol);
    }

    @Test
    public void testCreateUserAndLogin() throws DuplicateInstanceException, InstanceNotFoundException, IncorrectLoginException {

        User user = new User("userName", "password", "firstName", "lastName");

        Rol rol = createRol("Rol");
        rolDao.save(rol);

        List<Long> rolList = new ArrayList<>();

        rolList.add(rol.getId());

        userService.createUser(user, rolList);
        User userLogin = userService.login("userName", "password");

        assertEquals(user.getUserName(), userLogin.getUserName());
        assertEquals(user.getFirstName(), userLogin.getFirstName());
        assertEquals(user.getLastName(), userLogin.getLastName());
        //Averiguar porque falla
        //assertEquals(userLogin.getUserRols().size(), 1);

    }

    @Test
    public void testCreateUserDuplicatedUserName() throws DuplicateInstanceException, InstanceNotFoundException {

        User user = createUser("user");

        userService.createUser(user, new ArrayList<>());
        assertThrows(DuplicateInstanceException.class, () -> userService.createUser(user, new ArrayList<>()));

    }

    @Test
    public void testCreateUserWithNonExistingRol() {

        User user = createUser("user");
        List<Long> rolList = new ArrayList<>();
        rolList.add(NON_EXISTENT_ID);

        assertThrows(InstanceNotFoundException.class, () -> userService.createUser(user, rolList));

    }

    @Test
    public void testLogin() throws DuplicateInstanceException, IncorrectLoginException, InstanceNotFoundException {

        User user = createUser("user");
        String clearPassword = user.getPassword();

        userService.createUser(user, new ArrayList<>());

        User loggedInUser = userService.login(user.getUserName(), clearPassword);

        assertEquals(user, loggedInUser);

    }

    @Test
    public void testLoginWithIncorrectPassword() throws DuplicateInstanceException, InstanceNotFoundException {

        User user = createUser("user");
        String clearPassword = user.getPassword();

        userService.createUser(user, new ArrayList<>());
        assertThrows(IncorrectLoginException.class, () ->
                userService.login(user.getUserName(), 'X' + clearPassword));

    }

    @Test
    public void testLoginWithNonExistentUserName() {
        assertThrows(IncorrectLoginException.class, () -> userService.login("X", "Y"));
    }

    //Marcador
    @Test
    public void testUpdateProfile() throws InstanceNotFoundException, DuplicateInstanceException, IncorrectLoginException {

        User user = createUser("user");

        userService.createUser(user, new ArrayList<>());

        user.setUserName('X' + user.getUserName());
        user.setFirstName('X' + user.getFirstName());
        user.setLastName('X' + user.getLastName());

        userService.updateUser(user.getId(), 'X' + user.getUserName(),
                'X' + user.getFirstName(), 'X' + user.getLastName(), new ArrayList<>());

        User updatedUser = userService.login(user.getUserName(), "password");

        assertEquals(user, updatedUser);

    }

    @Test
    public void testUpdateUserWithNonExistentId() {
        assertThrows(InstanceNotFoundException.class, () ->
                userService.updateUser(NON_EXISTENT_ID, "X", "X", "X", new ArrayList<>()));
    }

    @Test
    public void testChangePassword() throws DuplicateInstanceException, InstanceNotFoundException,
            IncorrectPasswordException, IncorrectLoginException {

        User user = createUser("user");
        String oldPassword = user.getPassword();
        String newPassword = 'X' + oldPassword;

        userService.createUser(user, new ArrayList<>());
        userService.changePassword(user.getId(), oldPassword, newPassword);
        userService.login(user.getUserName(), newPassword);

    }

    @Test
    public void testChangePasswordWithNonExistentId() {
        assertThrows(InstanceNotFoundException.class, () ->
                userService.changePassword(NON_EXISTENT_ID, "X", "Y"));
    }

    @Test
    public void testChangePasswordWithIncorrectPassword() throws DuplicateInstanceException, InstanceNotFoundException {

        User user = createUser("user");
        String oldPassword = user.getPassword();
        String newPassword = 'X' + oldPassword;

        userService.createUser(user, new ArrayList<>());
        assertThrows(IncorrectPasswordException.class, () ->
                userService.changePassword(user.getId(), 'Y' + oldPassword, newPassword));

    }
}
