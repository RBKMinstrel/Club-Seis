package es.minstrel.app.rest.dtos;

public class RolDto {

    private Long id;
    private String name;

    public RolDto() {
    }

    public RolDto(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
