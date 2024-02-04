package es.minstrel.app.model.entities;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
public class Rol {

    private long id;
    private String role;
    private Set<UserRol> userRols = new HashSet<>();

    public Rol() {
    }

    public Rol(String role) {
        this.role = role;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @OneToMany(mappedBy = "rol")
    public Set<UserRol> getUserRols() {
        return userRols;
    }

    public void setUserRols(Set<UserRol> userRols) {
        this.userRols = userRols;
    }

    public void addUserRol(UserRol userRol) {
        userRols.add(userRol);
        userRol.setRol(this);
    }

    public void removeUserRol(UserRol userRol) {
        userRols.remove(userRol);
    }

}
