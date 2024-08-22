package es.minstrel.app.model.entities;

import jakarta.persistence.*;

@Entity
public class Factura {

    public enum Tipo {
        FACTURA((byte) 1),
        RECIBI((byte) 2);

        private final byte valor;

        Tipo(byte valor) {
            this.valor = valor;
        }

        public byte getValor() {
            return valor;
        }

        public static Tipo fromValor(byte valor) {
            for (Tipo tipo : Tipo.values()) {
                if (tipo.getValor() == valor) {
                    return tipo;
                }
            }
            return null;
        }
    }

    private long id;
    private String filepath;
    private String codigo;
    private Tipo tipo;
    private String anotacion;
    private String emisor;
    private String receptor;
    private Movimiento movimiento;

    public Factura() {
    }

    public Factura(String codigo, Tipo tipo, String anotacion, String emisor, String receptor) {
        this.codigo = codigo;
        this.tipo = tipo;
        this.anotacion = anotacion;
        this.emisor = emisor;
        this.receptor = receptor;
    }

    public Factura(String filepath, String codigo, Tipo tipo, String anotacion,
                   String emisor, String receptor, Movimiento movimiento) {
        this.filepath = filepath;
        this.codigo = codigo;
        this.tipo = tipo;
        this.anotacion = anotacion;
        this.emisor = emisor;
        this.receptor = receptor;
        this.movimiento = movimiento;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFilepath() {
        return filepath;
    }

    public void setFilepath(String filepath) {
        this.filepath = filepath;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Tipo getTipo() {
        return tipo;
    }

    public void setTipo(Tipo tipo) {
        this.tipo = tipo;
    }

    public String getAnotacion() {
        return anotacion;
    }

    public void setAnotacion(String anotacion) {
        this.anotacion = anotacion;
    }

    public String getEmisor() {
        return emisor;
    }

    public void setEmisor(String emisor) {
        this.emisor = emisor;
    }

    public String getReceptor() {
        return receptor;
    }

    public void setReceptor(String receptor) {
        this.receptor = receptor;
    }

    @OneToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "movimientoId")
    public Movimiento getMovimiento() {
        return movimiento;
    }

    public void setMovimiento(Movimiento movimiento) {
        this.movimiento = movimiento;
    }
}
