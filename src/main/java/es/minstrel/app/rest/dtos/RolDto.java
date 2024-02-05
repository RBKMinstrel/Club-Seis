package es.minstrel.app.rest.dtos;

public class RolDto {

    private Long id;
    private String rol;

    public RolDto() {
    }

    public RolDto(Long id, String rol) {
        this.id = id;
        this.rol = rol;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }
}
