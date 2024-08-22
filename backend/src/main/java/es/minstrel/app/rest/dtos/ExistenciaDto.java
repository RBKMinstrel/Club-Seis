package es.minstrel.app.rest.dtos;

public class ExistenciaDto {

    private String articulo;
    private Long tallaId;
    private Long cantidad;

    public ExistenciaDto() {
    }

    public ExistenciaDto(String articulo, Long tallaId, Long cantidad) {
        this.articulo = articulo;
        this.tallaId = tallaId;
        this.cantidad = cantidad;
    }

    public String getArticulo() {
        return articulo;
    }

    public void setArticulo(String articulo) {
        this.articulo = articulo;
    }

    public Long getTallaId() {
        return tallaId;
    }

    public void setTallaId(Long tallaId) {
        this.tallaId = tallaId;
    }

    public Long getCantidad() {
        return cantidad;
    }

    public void setCantidad(Long cantidad) {
        this.cantidad = cantidad;
    }
}
