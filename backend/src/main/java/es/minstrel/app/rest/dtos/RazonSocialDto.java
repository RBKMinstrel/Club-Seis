package es.minstrel.app.rest.dtos;

public class RazonSocialDto {

    private long id;
    private String denominacion;
    private String cifnif;

    public RazonSocialDto() {
    }

    public RazonSocialDto(long id, String denominacion, String cifnif) {
        this.id = id;
        this.denominacion = denominacion;
        this.cifnif = cifnif;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getDenominacion() {
        return denominacion;
    }

    public void setDenominacion(String denominacion) {
        this.denominacion = denominacion;
    }

    public String getCifnif() {
        return cifnif;
    }

    public void setCifnif(String cifnif) {
        this.cifnif = cifnif;
    }
}
