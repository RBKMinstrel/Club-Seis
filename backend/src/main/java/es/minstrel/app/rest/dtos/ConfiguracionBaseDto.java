package es.minstrel.app.rest.dtos;

public class ConfiguracionBaseDto {

    private String club;
    private String direccion;
    private String telefono;
    private String nif;
    private String otros;

    public ConfiguracionBaseDto() {
    }

    public ConfiguracionBaseDto(String club, String direccion, String telefono, String nif, String otros) {
        this.club = club;
        this.direccion = direccion;
        this.telefono = telefono;
        this.nif = nif;
        this.otros = otros;
    }

    public String getClub() {
        return club;
    }

    public void setClub(String club) {
        this.club = club;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getNif() {
        return nif;
    }

    public void setNif(String nif) {
        this.nif = nif;
    }

    public String getOtros() {
        return otros;
    }

    public void setOtros(String otros) {
        this.otros = otros;
    }
}
