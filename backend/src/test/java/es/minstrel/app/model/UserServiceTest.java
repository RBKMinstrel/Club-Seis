package es.minstrel.app.model;

import es.minstrel.app.model.entities.User;
import es.minstrel.app.model.entities.UserDao;
import es.minstrel.app.model.exceptions.DuplicateInstanceException;
import es.minstrel.app.model.exceptions.IncorrectLoginException;
import es.minstrel.app.model.exceptions.IncorrectPasswordException;
import es.minstrel.app.model.exceptions.InstanceNotFoundException;
import es.minstrel.app.model.services.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

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
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private UserService userService;

    /*Metodos auxiliares*/

    private User createUser(String userName) {
        String encodePassword = passwordEncoder.encode("password");
        return userDao.save(new User(userName, encodePassword, "firstName", "lastName"));
    }


    /*Funcion loguearse*/

    @Test
    public void testLogin()
            throws IncorrectLoginException {

        //1. Iniciar resursos
        User user = createUser("user");
        String clearPassword = "password";

        //2. Llamar al metodo a probar
        User loggedInUser = userService.login(user.getUserName(), clearPassword);

        //3. Comprobar el resultado
        assertEquals(user, loggedInUser);

    }

    @Test
    public void testLoginWithIncorrectPassword() {

        User user = createUser("user");
        String clearPassword = user.getPassword();
        assertThrows(IncorrectLoginException.class, () ->
                userService.login(user.getUserName(), 'X' + clearPassword));

    }

    @Test
    public void testLoginWithNonExistentUserName() {
        assertThrows(IncorrectLoginException.class, () -> userService.login("X", "Y"));
    }

    /*Funcion de login por id*/

    @Test
    public void testLoginFromId() throws InstanceNotFoundException {

        User user = createUser("user");

        User loggedInUser = userService.loginFromId(user.getId());

        assertEquals(user, loggedInUser);

    }

    @Test
    public void testLoginFromIdWithNonExistentUser() {
        assertThrows(InstanceNotFoundException.class, () -> userService.loginFromId(NON_EXISTENT_ID));
    }

    /*Funcion de actualizar usuario*/

    @Test
    public void testUpdateProfile() throws InstanceNotFoundException, DuplicateInstanceException {

        User user = createUser("user");


        user.setUserName('X' + user.getUserName());
        user.setFirstName('X' + user.getFirstName());
        user.setLastName('X' + user.getLastName());

        User updatedUser = userService.updateUser(user.getId(), 'X' + user.getUserName(),
                'X' + user.getFirstName(), 'X' + user.getLastName());

        assertEquals(user, updatedUser);

    }

    @Test
    public void testUpdateUserWithNonExistentId() {
        assertThrows(InstanceNotFoundException.class, () ->
                userService.updateUser(NON_EXISTENT_ID, "X", "X", "X"));
    }

    @Test
    public void testUpdateProfileWithUserNameExisting() {

        User user1 = createUser("user1");
        User user2 = createUser("user2");

        assertThrows(DuplicateInstanceException.class, () ->
                userService.updateUser(user1.getId(), user2.getUserName(),
                        user1.getFirstName(), user1.getLastName()));

    }

    /*Funcion de cambiar contraseña*/

    @Test
    public void testChangePassword() throws InstanceNotFoundException,
            IncorrectPasswordException, IncorrectLoginException {

        User user = createUser("user");
        String oldPassword = "password";
        String newPassword = 'X' + oldPassword;

        userService.changePassword(user.getId(), oldPassword, newPassword);
        userService.login(user.getUserName(), newPassword);

    }

    @Test
    public void testChangePasswordWithNonExistentId() {
        assertThrows(InstanceNotFoundException.class, () ->
                userService.changePassword(NON_EXISTENT_ID, "X", "Y"));
    }

    @Test
    public void testChangePasswordWithIncorrectPassword() {

        User user = createUser("user");
        String oldPassword = user.getPassword();
        String newPassword = 'X' + oldPassword;

        assertThrows(IncorrectPasswordException.class, () ->
                userService.changePassword(user.getId(), 'Y' + oldPassword, newPassword));

    }

}
