package es.minstrel.app.rest.dtos;

import es.minstrel.app.model.entities.Rol;
import es.minstrel.app.model.entities.User;

import java.util.List;

public class UserConversor {

    private UserConversor() {
    }

    public final static List<UserDto> toUserDtos(List<User> user) {
        return user.stream().map(UserConversor::toUserDto).toList();
    }

    public final static UserDto toUserDto(User user) {
        return new UserDto(user.getId(), user.getUserName(), user.getFirstName(), user.getLastName(),
                user.getUserRols().stream().map(userRol -> userRol.getRol().getId()).toList());
    }

    public final static UserInfoDto toUserInfoDto(User user) {
        return new UserInfoDto(user.getId(), user.getUserName(), user.getFirstName(), user.getLastName(),
                user.getUserRols().stream().map(userRol -> userRol.getRol().getRole()).toList());
    }

    public final static User toUser(UserDto userDto) {

        return new User(userDto.getUserName(), userDto.getPassword(), userDto.getFirstName(), userDto.getLastName());
    }

    public final static AuthenticatedUserDto toAuthenticatedUserDto(String serviceToken, User user) {

        return new AuthenticatedUserDto(serviceToken, toUserInfoDto(user));

    }

    public final static List<RolDto> toRolDtos(List<Rol> roles) {
        return roles.stream().map(UserConversor::toRolDto).toList();
    }

    public final static RolDto toRolDto(Rol rol) {
        return new RolDto(rol.getId(), rol.getRole());
    }

    public final static List<Long> toRolesIds(List<RolDto> rolDtoList) {

        return rolDtoList.stream().map(RolDto::getId).toList();

    }
}
