package es.minstrel.app.model;

import es.minstrel.app.model.entities.*;
import es.minstrel.app.model.exceptions.DuplicateInstanceException;
import es.minstrel.app.model.exceptions.InstanceNotFoundException;
import es.minstrel.app.model.exceptions.PermissionException;
import es.minstrel.app.model.services.AdminService;
import es.minstrel.app.model.services.Block;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class AdminServiceTest {

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
    private AdminService adminService;

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
    public void testCreateUser() throws DuplicateInstanceException, InstanceNotFoundException, PermissionException {

        User user = new User("userName", "password", "firstName", "lastName");

        Rol rol = createRol("Rol");
        rolDao.save(rol);

        List<Long> rolList = new ArrayList<>();

        rolList.add(rol.getId());

        adminService.createUser(user, rolList);
    }

    @Test
    public void testCreateUserAdmin() {

        User user = new User("userName", "password", "firstName", "lastName");

        Rol rol = createRol("ADMIN");
        rolDao.save(rol);

        List<Long> rolList = new ArrayList<>();

        rolList.add(rol.getId());

        assertThrows(PermissionException.class, () ->
                adminService.createUser(user, rolList));

    }

    @Test
    public void testCreateUserDuplicatedUserName() throws DuplicateInstanceException, InstanceNotFoundException, PermissionException {

        User user = createUser("user");

        adminService.createUser(user, new ArrayList<>());
        assertThrows(DuplicateInstanceException.class, () -> adminService.createUser(user, new ArrayList<>()));

    }

    @Test
    public void testCreateUserWithNonExistingRol() {

        User user = createUser("user");
        List<Long> rolList = new ArrayList<>();
        rolList.add(NON_EXISTENT_ID);

        assertThrows(InstanceNotFoundException.class, () -> adminService.createUser(user, rolList));

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

        adminService.createUser(user, rolList);

        rolList.remove(rol1.getId());
        rolList.add(rol2.getId());

        user.setUserName('X' + user.getUserName());
        user.setFirstName('X' + user.getFirstName());
        user.setLastName('X' + user.getLastName());

        adminService.updateUser(user.getId(), 'X' + user.getUserName(),
                'X' + user.getFirstName(), 'X' + user.getLastName(), rolList);
        Optional<User> updatedUser = userDao.findById(user.getId());

        assertTrue(updatedUser.isPresent());
        assertEquals(user, updatedUser.get());

    }

    @Test
    public void testUpdateUserWithNonExistentId() {
        assertThrows(InstanceNotFoundException.class, () ->
                adminService.updateUser(NON_EXISTENT_ID, "X", "X", "X", new ArrayList<>()));
    }

    @Test
    public void testUpdateProfileWithUserNameExisting() throws InstanceNotFoundException, DuplicateInstanceException, PermissionException {

        User user1 = createUser("user1");
        User user2 = createUser("user2");

        adminService.createUser(user1, new ArrayList<>());
        adminService.createUser(user2, new ArrayList<>());

        assertThrows(DuplicateInstanceException.class, () ->
                adminService.updateUser(user1.getId(), user2.getUserName(),
                        user1.getFirstName(), user1.getLastName(), new ArrayList<>()));

    }

    @Test
    public void testUpdateProfileWithNonExistingRoles() throws InstanceNotFoundException, DuplicateInstanceException, PermissionException {

        User user = createUser("user");

        List<Long> rolList = new ArrayList<>();
        rolList.add(NON_EXISTENT_ID);

        adminService.createUser(user, new ArrayList<>());

        assertThrows(InstanceNotFoundException.class, () ->
                adminService.updateUser(user.getId(), 'X' + user.getUserName(),
                        'X' + user.getFirstName(), 'X' + user.getLastName(), rolList));

    }

    @Test
    public void testUpdateUserWithAdminRole() throws InstanceNotFoundException, DuplicateInstanceException, PermissionException {

        User user = createUser("user");

        Rol rol1 = createRol("ADMIN");
        rolDao.save(rol1);

        List<Long> rolList = new ArrayList<>();

        rolList.add(rol1.getId());

        adminService.createUser(user, new ArrayList<>());

        assertThrows(PermissionException.class, () ->
                adminService.updateUser(user.getId(), 'X' + user.getUserName(),
                        'X' + user.getFirstName(), 'X' + user.getLastName(), rolList));

    }

    @Test
    public void testUpdateUserIsAdmin() {

        User user = createUserAdmin();

        assertThrows(PermissionException.class, () ->
                adminService.updateUser(user.getId(), user.getUserName(),
                        user.getFirstName(), user.getLastName(), new ArrayList<>()));

    }

    /*Funcion borrar usuarios*/

    @Test
    public void testDeleteUser() throws DuplicateInstanceException, InstanceNotFoundException, PermissionException {

        User user = createUser("user");

        Rol rol = createRol("Rol");
        rolDao.save(rol);

        List<Long> rolList = new ArrayList<>();

        rolList.add(rol.getId());

        adminService.createUser(user, rolList);
        adminService.deleteUser(user.getId());
    }

    @Test
    public void testDeleteUserNonExistingUser() {

        assertThrows(InstanceNotFoundException.class, () -> adminService.deleteUser(NON_EXISTENT_ID));
    }

    @Test
    public void testDeleteUserAdmin() {
        User userAdmin = createUserAdmin();
        assertThrows(PermissionException.class, () -> adminService.deleteUser(userAdmin.getId()));
    }

    /*Funcion obtener todos los usuarios*/

    @Test
    public void testGetAllUser() {
        User user1 = createUser("user1");
        User user2 = createUser("user2");

        userDao.save(user1);
        userDao.save(user2);

        Block<User> userList = adminService.getAllUser(0, 5);

        assertEquals(userList.getItems().size(), 2);
        assertTrue(userList.getItems().contains(user1));
        assertTrue(userList.getItems().contains(user2));

    }

    @Test
    public void testGetAllUserEmpty() {
        assertTrue(adminService.getAllUser(0, 5).getItems().isEmpty());
    }

    /*Funcion obtener todos los roles*/

    @Test
    public void testGetAllRol() {
        Rol rol1 = createRol("rol1");
        Rol rol2 = createRol("rol2");

        rolDao.save(rol1);
        rolDao.save(rol2);

        List<Rol> rolList = adminService.getAllRoles();

        assertEquals(rolList.size(), 2);
        assertTrue(rolList.contains(rol1));
        assertTrue(rolList.contains(rol2));

    }

    @Test
    public void testGetAllRolEmpty() {
        assertTrue(adminService.getAllRoles().isEmpty());
    }

}
