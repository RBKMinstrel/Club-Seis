package es.minstrel.app.model.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class RazonSocial {

    private long id;
    private String denominacion;
    private String cifnif;

    public RazonSocial() {
    }

    public RazonSocial(String denominacion, String cifnif) {
        this.denominacion = denominacion;
        this.cifnif = cifnif;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
