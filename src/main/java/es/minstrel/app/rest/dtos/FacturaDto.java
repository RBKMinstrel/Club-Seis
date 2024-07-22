package es.minstrel.app.rest.dtos;

public class FacturaDto {

    private long id;
    private String codigo;
    private Long fecha;
    private byte tipo;
    private String anotacion;
    private String emisor;
    private String receptor;

    public FacturaDto() {
    }

    public FacturaDto(long id, String codigo, Long fecha, byte tipo, String anotacion, String emisor, String receptor) {
        this.id = id;
        this.codigo = codigo;
        this.fecha = fecha;
        this.tipo = tipo;
        this.anotacion = anotacion;
        this.emisor = emisor;
        this.receptor = receptor;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Long getFecha() {
        return fecha;
    }

    public void setFecha(Long fecha) {
        this.fecha = fecha;
    }

    public byte getTipo() {
        return tipo;
    }

    public void setTipo(byte tipo) {
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
}
