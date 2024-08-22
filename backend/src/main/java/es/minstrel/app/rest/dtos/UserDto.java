package es.minstrel.app.rest.dtos;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public class UserDto {

    public interface AllValidations {
    }

    public interface UpdateValidations {
    }

    private Long id;
    private String userName;
    private String password;
    private String firstName;
    private String lastName;
    private List<Long> rolesIds;

    public UserDto() {
    }

    public UserDto(Long id, String userName, String firstName, String lastName, List<Long> roles) {

        this.id = id;
        this.userName = userName != null ? userName.trim() : null;
        this.firstName = firstName.trim();
        this.lastName = lastName.trim();
        this.rolesIds = roles;

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @NotNull(groups = {AllValidations.class, UpdateValidations.class})
    @Size(min = 1, max = 60, groups = {AllValidations.class, UpdateValidations.class})
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName.trim();
    }

    @NotNull(groups = {AllValidations.class})
    @Size(min = 1, max = 60, groups = {AllValidations.class})
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @NotNull(groups = {AllValidations.class, UpdateValidations.class})
    @Size(min = 1, max = 60, groups = {AllValidations.class, UpdateValidations.class})
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName.trim();
    }

    @NotNull(groups = {AllValidations.class, UpdateValidations.class})
    @Size(min = 1, max = 60, groups = {AllValidations.class, UpdateValidations.class})
    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName.trim();
    }

    public List<Long> getRolesIds() {
        return rolesIds;
    }

    public void setRolesIds(List<Long> rolesIds) {
        this.rolesIds = rolesIds;
    }
}