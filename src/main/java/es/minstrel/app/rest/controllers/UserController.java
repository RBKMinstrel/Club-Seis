package es.minstrel.app.rest.controllers;

import es.minstrel.app.model.entities.User;
import es.minstrel.app.model.exceptions.*;
import es.minstrel.app.model.services.UserService;
import es.minstrel.app.rest.common.ErrorsDto;
import es.minstrel.app.rest.common.JwtGenerator;
import es.minstrel.app.rest.common.JwtInfo;
import es.minstrel.app.rest.dtos.AuthenticatedUserDto;
import es.minstrel.app.rest.dtos.ChangePasswordParamsDto;
import es.minstrel.app.rest.dtos.LoginParamsDto;
import es.minstrel.app.rest.dtos.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Locale;

import static es.minstrel.app.rest.dtos.UserConversor.toAuthenticatedUserDto;
import static es.minstrel.app.rest.dtos.UserConversor.toUserDto;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final static String INCORRECT_LOGIN_EXCEPTION_CODE = "project.exceptions.IncorrectLoginException";
    private final static String INCORRECT_PASSWORD_EXCEPTION_CODE = "project.exceptions.IncorrectPasswordException";

    @Autowired
    private MessageSource messageSource;

    @Autowired
    private JwtGenerator jwtGenerator;

    @Autowired
    private UserService userService;

    @ExceptionHandler(IncorrectLoginException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public ErrorsDto handleIncorrectLoginException(IncorrectLoginException exception, Locale locale) {

        String errorMessage = messageSource.getMessage(INCORRECT_LOGIN_EXCEPTION_CODE, null,
                INCORRECT_LOGIN_EXCEPTION_CODE, locale);

        return new ErrorsDto(errorMessage);

    }

    @ExceptionHandler(IncorrectPasswordException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public ErrorsDto handleIncorrectPasswordException(IncorrectPasswordException exception, Locale locale) {

        String errorMessage = messageSource.getMessage(INCORRECT_PASSWORD_EXCEPTION_CODE, null,
                INCORRECT_PASSWORD_EXCEPTION_CODE, locale);

        return new ErrorsDto(errorMessage);

    }

    @PostMapping("/login")
    public AuthenticatedUserDto login(@Validated @RequestBody LoginParamsDto params)
            throws IncorrectLoginException {

        User user = userService.login(params.getUserName(), params.getPassword());

        return toAuthenticatedUserDto(generateServiceToken(user), user);

    }

    @PutMapping("/{id}")
    public UserDto updateUser(@RequestAttribute Long userId, @PathVariable Long id,
                              @Validated({UserDto.UpdateValidations.class}) @RequestBody UserDto userDto)
            throws InstanceNotFoundException, DuplicateInstanceException, PermissionException {

        if (!id.equals(userId))
            throw new PermissionException();

        return toUserDto(userService.updateUser(id, userDto.getUserName(), userDto.getFirstName(), userDto.getLastName()));

    }

    @PostMapping("/{id}/changePassword")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void changePassword(@RequestAttribute Long userId, @PathVariable Long id,
                               @Validated @RequestBody ChangePasswordParamsDto params)
            throws PermissionException, InstanceNotFoundException, IncorrectPasswordException {

        if (!id.equals(userId)) {
            throw new PermissionException();
        }

        userService.changePassword(id, params.getOldPassword(), params.getNewPassword());

    }

    private String generateServiceToken(User user) {

        JwtInfo jwtInfo = new JwtInfo(user.getId(), user.getUserName(), user.getUserRols().stream().map(x -> x.getRol().getRole()).toList());

        return jwtGenerator.generate(jwtInfo);

    }

}
