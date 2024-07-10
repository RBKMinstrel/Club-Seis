package es.minstrel.app.model.entities;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Articulo {

    public enum Genero {
        UNISEX((byte) 1),
        MASCULINO((byte) 2),
        FEMENINO((byte) 3);

        private final byte valor;

        Genero(byte valor) {
            this.valor = valor;
        }

        public byte getValor() {
            return valor;
        }

        public static Genero fromValor(byte valor) {
            for (Genero genero : Genero.values()) {
                if (genero.getValor() == valor) {
                    return genero;
                }
            }
            throw new IllegalArgumentException("Valor de género no válido: " + valor);
        }
    }

    private long id;
    private String name;
    private String imagename;
    private String imagepath;
    private Genero genero;
    private boolean esRopa;
    private BigDecimal precio;
    private BigDecimal precioSocio;
    private Set<Existencias> existencias = new HashSet<>();

    public Articulo() {

    }

    public Articulo(String name, String imagename, String imagepath, Genero genero, boolean esRopa, BigDecimal precio, BigDecimal precioSocio) {
        this.name = name;
        this.imagename = imagename;
        this.imagepath = imagepath;
        this.genero = genero;
        this.esRopa = esRopa;
        this.precio = precio;
        this.precioSocio = precioSocio;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImagename() {
        return imagename;
    }

    public void setImagename(String imagename) {
        this.imagename = imagename;
    }

    public String getImagepath() {
        return imagepath;
    }

    public void setImagepath(String imagepath) {
        this.imagepath = imagepath;
    }

    public Genero getGenero() {
        return genero;
    }

    public void setGenero(Genero genero) {
        this.genero = genero;
    }

    public boolean isEsRopa() {
        return esRopa;
    }

    public void setEsRopa(boolean esRopa) {
        this.esRopa = esRopa;
    }

    public BigDecimal getPrecio() {
        return precio;
    }

    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }

    public BigDecimal getPrecioSocio() {
        return precioSocio;
    }

    public void setPrecioSocio(BigDecimal precioSocio) {
        this.precioSocio = precioSocio;
    }

    @OneToMany(mappedBy = "articulo")
    public Set<Existencias> getExistencias() {
        return existencias;
    }

    public void setExistencias(Set<Existencias> existencias) {
        this.existencias = existencias;
    }
}
