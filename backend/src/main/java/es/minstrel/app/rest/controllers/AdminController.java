package es.minstrel.app.rest.controllers;

import es.minstrel.app.model.entities.User;
import es.minstrel.app.model.exceptions.DuplicateInstanceException;
import es.minstrel.app.model.exceptions.InstanceNotFoundException;
import es.minstrel.app.model.exceptions.PermissionException;
import es.minstrel.app.model.services.AdminService;
import es.minstrel.app.model.services.utils.Block;
import es.minstrel.app.rest.dtos.BlockDto;
import es.minstrel.app.rest.dtos.RolDto;
import es.minstrel.app.rest.dtos.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    public BlockDto<UserDto> getAllUser(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        Block<User> userBlock = adminService.getAllUser(page, size);

        return new BlockDto<>(toUserDtos(userBlock.getItems()), userBlock.getTotalItems());
    }

    @PostMapping("/users")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void createUser(@RequestAttribute Long userId,
                           @Validated({UserDto.AllValidations.class}) @RequestBody UserDto userDto)
            throws InstanceNotFoundException, DuplicateInstanceException, PermissionException {

        User user = toUser(userDto);

        adminService.createUser(user, userDto.getRolesIds());

    }

    @GetMapping("/users/{id}")
    public UserDto getUser(@RequestAttribute Long userId, @PathVariable Long id)
            throws InstanceNotFoundException {

        return toUserDto(adminService.getUserById(id));

    }

    @PutMapping("/users/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateUser(@RequestAttribute Long userId, @PathVariable Long id,
                           @Validated({UserDto.UpdateValidations.class}) @RequestBody UserDto userDto)
            throws InstanceNotFoundException, DuplicateInstanceException, PermissionException {

        adminService.updateUser(id, userDto.getUserName(), userDto.getPassword(), userDto.getFirstName(),
                userDto.getLastName(), userDto.getRolesIds());

    }

    @DeleteMapping("/users/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@RequestAttribute Long userId, @PathVariable Long id)
            throws InstanceNotFoundException, PermissionException {

        adminService.deleteUser(id);

    }

}
