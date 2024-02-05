package es.minstrel.app.model;

import es.minstrel.app.model.entities.*;
import es.minstrel.app.model.exceptions.*;
import es.minstrel.app.model.services.Block;
import es.minstrel.app.model.services.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

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
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private UserService userService;

    /*Metodos auxiliares*/

    private User createUser(String userName) {
        return new User(userName, "password", "firstName", "lastName");
    }

    private Rol createRol(String rol) {
        return new Rol(rol);
    }

    private User createUserAdmin() {
        User userAdmin = createUser("Admin");
        userAdmin.setPassword(passwordEncoder.encode(userAdmin.getPassword()));
        Rol rol = createRol("ADMIN");
        UserRol userRol = new UserRol(userAdmin, rol);

        userDao.save(userAdmin);
        rolDao.save(rol);
        userRolDao.save(userRol);

        userAdmin.addUserRol(userRol);
        rol.addUserRol(userRol);

        return userAdmin;
    }

    /*Funcion crear usuario*/

    @Test
    public void testCreateUserAndLogin() throws DuplicateInstanceException, InstanceNotFoundException, IncorrectLoginException, PermissionException {

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
        assertEquals(userLogin.getUserRols().size(), 1);
        assertTrue(user.getUserRols().stream().anyMatch(userRol -> userRol.getRol().getRole().equals("Rol")));

    }

    @Test
    public void testCreateUserAdmin() {

        User user = new User("userName", "password", "firstName", "lastName");

        Rol rol = createRol("ADMIN");
        rolDao.save(rol);

        List<Long> rolList = new ArrayList<>();

        rolList.add(rol.getId());

        assertThrows(PermissionException.class, () ->
                userService.createUser(user, rolList));

    }

    @Test
    public void testCreateUserDuplicatedUserName() throws DuplicateInstanceException, InstanceNotFoundException, PermissionException {

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

    /*Funcion loguearse*/

    @Test
    public void testLogin() throws DuplicateInstanceException, IncorrectLoginException, InstanceNotFoundException, PermissionException {

        User user = createUser("user");
        String clearPassword = user.getPassword();

        userService.createUser(user, new ArrayList<>());

        User loggedInUser = userService.login(user.getUserName(), clearPassword);

        assertEquals(user, loggedInUser);

    }

    @Test
    public void testLoginWithIncorrectPassword() throws DuplicateInstanceException, InstanceNotFoundException, PermissionException {

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

    /*Funcion de actualizar usuario*/

    @Test
    public void testUpdateProfile() throws InstanceNotFoundException, DuplicateInstanceException, PermissionException {

        User user = createUser("user");

        Rol rol1 = createRol("Rol1");
        Rol rol2 = createRol("Rol2");
        rolDao.save(rol1);
        rolDao.save(rol2);

        List<Long> rolList = new ArrayList<>();

        rolList.add(rol1.getId());

        userService.createUser(user, rolList);

        rolList.remove(rol1.getId());
        rolList.add(rol2.getId());

        user.setUserName('X' + user.getUserName());
        user.setFirstName('X' + user.getFirstName());
        user.setLastName('X' + user.getLastName());

        User updatedUser = userService.updateUser(user.getId(), 'X' + user.getUserName(),
                'X' + user.getFirstName(), 'X' + user.getLastName(), rolList);

        assertEquals(user, updatedUser);

    }

    @Test
    public void testUpdateUserWithNonExistentId() {
        assertThrows(InstanceNotFoundException.class, () ->
                userService.updateUser(NON_EXISTENT_ID, "X", "X", "X", new ArrayList<>()));
    }

    @Test
    public void testUpdateProfileWithUserNameExisting() throws InstanceNotFoundException, DuplicateInstanceException, PermissionException {

        User user1 = createUser("user1");
        User user2 = createUser("user2");

        userService.createUser(user1, new ArrayList<>());
        userService.createUser(user2, new ArrayList<>());

        assertThrows(DuplicateInstanceException.class, () ->
                userService.updateUser(user1.getId(), user2.getUserName(),
                        user1.getFirstName(), user1.getLastName(), new ArrayList<>()));

    }

    @Test
    public void testUpdateProfileWithNonExistingRoles() throws InstanceNotFoundException, DuplicateInstanceException, PermissionException {

        User user = createUser("user");

        List<Long> rolList = new ArrayList<>();
        rolList.add(NON_EXISTENT_ID);

        userService.createUser(user, new ArrayList<>());

        assertThrows(InstanceNotFoundException.class, () ->
                userService.updateUser(user.getId(), 'X' + user.getUserName(),
                        'X' + user.getFirstName(), 'X' + user.getLastName(), rolList));

    }

    @Test
    public void testUpdateUserWithAdminRole() throws InstanceNotFoundException, DuplicateInstanceException, PermissionException {

        User user = createUser("user");

        Rol rol1 = createRol("ADMIN");
        rolDao.save(rol1);

        List<Long> rolList = new ArrayList<>();

        rolList.add(rol1.getId());

        userService.createUser(user, new ArrayList<>());

        assertThrows(PermissionException.class, () ->
                userService.updateUser(user.getId(), 'X' + user.getUserName(),
                        'X' + user.getFirstName(), 'X' + user.getLastName(), rolList));

    }

    @Test
    public void testUpdateProfileTryRemoveRolAdmin()
            throws InstanceNotFoundException, DuplicateInstanceException, PermissionException {

        User user = createUserAdmin();
        Rol rol2 = createRol("Rol");

        rolDao.save(rol2);

        List<Long> rolList = new ArrayList<>();
        rolList.add(rol2.getId());

        User updatedUser = userService.updateUser(user.getId(), user.getUserName(),
                user.getFirstName(), user.getLastName(), rolList);

        assertTrue(updatedUser.getUserRols().stream().anyMatch(userRol -> userRol.getRol().getRole().equals("ADMIN")));
        assertFalse(updatedUser.getUserRols().stream().anyMatch(userRol -> userRol.getRol().getRole().equals("Rol")));

    }

    /*Funcion de cambiar contraseña*/

    @Test
    public void testChangePassword() throws DuplicateInstanceException, InstanceNotFoundException,
            IncorrectPasswordException, IncorrectLoginException, PermissionException {

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
    public void testChangePasswordWithIncorrectPassword() throws DuplicateInstanceException, InstanceNotFoundException, PermissionException {

        User user = createUser("user");
        String oldPassword = user.getPassword();
        String newPassword = 'X' + oldPassword;

        userService.createUser(user, new ArrayList<>());
        assertThrows(IncorrectPasswordException.class, () ->
                userService.changePassword(user.getId(), 'Y' + oldPassword, newPassword));

    }

    /*Funcion comprobar usuario es ADMIN*/

    @Test
    public void testCheckUserIsAdmin() throws InstanceNotFoundException {

        User user = createUserAdmin();

        assertTrue(userService.isUserAdmin(user.getId()));
    }

    @Test
    public void testCheckUserIsNotAdmin() throws DuplicateInstanceException, InstanceNotFoundException, PermissionException {

        User user = createUser("user");

        Rol rol = createRol("Rol");
        rolDao.save(rol);

        List<Long> rolList = new ArrayList<>();

        rolList.add(rol.getId());

        userService.createUser(user, rolList);
        assertFalse(userService.isUserAdmin(user.getId()));
    }

    @Test
    public void testCheckUserIsAdminWithNonExistingUser() {
        assertThrows(InstanceNotFoundException.class, () -> userService.isUserAdmin(NON_EXISTENT_ID));
    }

    /*Funcion borrar usuarios*/

    @Test
    public void testDeleteUser() throws DuplicateInstanceException, InstanceNotFoundException, PermissionException {

        User user = createUser("user");

        Rol rol = createRol("Rol");
        rolDao.save(rol);

        List<Long> rolList = new ArrayList<>();

        rolList.add(rol.getId());

        userService.createUser(user, rolList);
        userService.deleteUser(user.getId());
    }

    @Test
    public void testDeleteUserNonExistingUser() {

        assertThrows(InstanceNotFoundException.class, () -> userService.deleteUser(NON_EXISTENT_ID));
    }

    @Test
    public void testDeleteUserAdmin() {
        User userAdmin = createUserAdmin();
        assertThrows(PermissionException.class, () -> userService.deleteUser(userAdmin.getId()));
    }

    /*Funcion obtener todos los usuarios*/

    @Test
    public void testGetAllUser() {
        User user1 = createUser("user1");
        User user2 = createUser("user2");

        userDao.save(user1);
        userDao.save(user2);

        Block<User> userList = userService.getAllUser(0, 5);

        assertEquals(userList.getItems().size(), 2);
        assertTrue(userList.getItems().contains(user1));
        assertTrue(userList.getItems().contains(user2));

    }

    @Test
    public void testGetAllUserEmpty() {
        assertTrue(userService.getAllUser(0, 5).getItems().isEmpty());
    }

    /*Funcion obtener todos los roles*/

    @Test
    public void testGetAllRol() {
        Rol rol1 = createRol("rol1");
        Rol rol2 = createRol("rol2");

        rolDao.save(rol1);
        rolDao.save(rol2);

        List<Rol> rolList = userService.getAllRoles();

        assertEquals(rolList.size(), 2);
        assertTrue(rolList.contains(rol1));
        assertTrue(rolList.contains(rol2));

    }

    @Test
    public void testGetAllRolEmpty() {
        assertTrue(userService.getAllRoles().isEmpty());
    }

}
