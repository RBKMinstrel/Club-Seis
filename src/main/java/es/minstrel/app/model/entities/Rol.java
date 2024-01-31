package es.minstrel.app.model.entities;

import jakarta.persistence.*;

import java.util.Set;

@Entity
public class Rol {

    private long id;
    private String role;
    private Set<UserRol> userRols;

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
}
