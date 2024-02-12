package es.minstrel.app.rest.controllers;

import es.minstrel.app.model.entities.User;
import es.minstrel.app.model.exceptions.DuplicateInstanceException;
import es.minstrel.app.model.exceptions.InstanceNotFoundException;
import es.minstrel.app.model.exceptions.PermissionException;
import es.minstrel.app.model.services.AdminService;
import es.minstrel.app.model.services.Block;
import es.minstrel.app.rest.dtos.BlockDto;
import es.minstrel.app.rest.dtos.RolDto;
import es.minstrel.app.rest.dtos.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static es.minstrel.app.rest.dtos.UserConversor.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/roles")
    public List<RolDto> getAllRoles() {
        return toRolDtos(adminService.getAllRoles());
    }

    @GetMapping("/users")
    public BlockDto<UserDto> getAllUser() {
        Block<User> userBlock = adminService.getAllUser(0, 5);

        return new BlockDto<>(toUserDtos(userBlock.getItems()), userBlock.getExistMoreItems());
    }

    @PostMapping("/users/create")
    public void createUser(@RequestAttribute Long userId,
                           @Validated({UserDto.AllValidations.class}) @RequestBody UserDto userDto)
            throws InstanceNotFoundException, DuplicateInstanceException, PermissionException {

        User user = toUser(userDto);

        adminService.createUser(user, toRolesIds(userDto.getRoles()));

    }

    @PutMapping("/users/{id}")
    public void updateUser(@RequestAttribute Long userId, @PathVariable Long id,
                           @Validated({UserDto.UpdateValidations.class}) @RequestBody UserDto userDto)
            throws InstanceNotFoundException, DuplicateInstanceException, PermissionException {

        adminService.updateUser(id, userDto.getUserName(), userDto.getFirstName(), userDto.getLastName(),
                toRolesIds(userDto.getRoles()));

    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@RequestAttribute Long userId, @PathVariable Long id)
            throws InstanceNotFoundException, PermissionException {

        adminService.deleteUser(id);

    }

}
