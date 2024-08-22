package es.minstrel.app.rest.dtos;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public class UserInfoDto {

    private Long id;
    private String userName;
    private String password;
    private String firstName;
    private String lastName;
    private List<String> roles;

    public UserInfoDto() {
    }

    public UserInfoDto(Long id, String userName, String firstName, String lastName, List<String> roles) {

        this.id = id;
        this.userName = userName != null ? userName.trim() : null;
        this.firstName = firstName.trim();
        this.lastName = lastName.trim();
        this.roles = roles;

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @NotNull()
    @Size(min = 1, max = 60)
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName.trim();
    }

    @NotNull()
    @Size(min = 1, max = 60)
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @NotNull()
    @Size(min = 1, max = 60)
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName.trim();
    }

    @NotNull()
    @Size(min = 1, max = 60)
    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName.trim();
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}
