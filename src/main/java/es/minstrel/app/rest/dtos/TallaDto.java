package es.minstrel.app.rest.dtos;

public class TallaDto {

    private Long id;
    private String name;

    public TallaDto() {
    }

    public TallaDto(Long tallaId) {
        this.id = tallaId;
    }

    public TallaDto(Long tallaId, String name) {
        this.id = tallaId;
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
