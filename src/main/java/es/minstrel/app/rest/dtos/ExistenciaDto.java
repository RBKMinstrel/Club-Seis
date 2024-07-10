package es.minstrel.app.rest.dtos;

public class ExistenciaDto {

    private String articulo;
    private String talla;
    private Long cantidad;

    public ExistenciaDto() {
    }

    public ExistenciaDto(String articulo, String talla, Long cantidad) {
        this.articulo = articulo;
        this.talla = talla;
        this.cantidad = cantidad;
    }

    public String getArticulo() {
        return articulo;
    }

    public void setArticulo(String articulo) {
        this.articulo = articulo;
    }

    public String getTalla() {
        return talla;
    }

    public void setTalla(String talla) {
        this.talla = talla;
    }

    public Long getCantidad() {
        return cantidad;
    }

    public void setCantidad(Long cantidad) {
        this.cantidad = cantidad;
    }
}
