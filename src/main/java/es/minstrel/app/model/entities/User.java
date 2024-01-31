package es.minstrel.app.model.entities;

import jakarta.persistence.*;

import java.util.Set;

@Entity
public class User {

    private long id;
    private String userName;
    private String password;
    private String firstName;
    private String lastName;
    private Set<UserRol> userRols;

    public User() {
    }

    public User(String userName, String password, String firstName, String lastName) {
        this.userName = userName;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @OneToMany(mappedBy = "user")
    public Set<UserRol> getUserRols() {
        return userRols;
    }

    public void setUserRols(Set<UserRol> userRols) {
        this.userRols = userRols;
    }
}
