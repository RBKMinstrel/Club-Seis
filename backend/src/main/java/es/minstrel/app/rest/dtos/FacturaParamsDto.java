package es.minstrel.app.rest.dtos;

import java.util.List;

public class FacturaParamsDto {

    private long fecha;
    private String codigo;
    private String receptor;
    private List<FacturaItemDto> facturaItems;

    public FacturaParamsDto() {
    }

    public FacturaParamsDto(long fecha, String codigo, String receptor, List<FacturaItemDto> facturaItems) {
        this.fecha = fecha;
        this.codigo = codigo;
        this.receptor = receptor;
        this.facturaItems = facturaItems;
    }

    public long getFecha() {
        return fecha;
    }

    public void setFecha(long fecha) {
        this.fecha = fecha;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getReceptor() {
        return receptor;
    }

    public void setReceptor(String receptor) {
        this.receptor = receptor;
    }

    public List<FacturaItemDto> getFacturaItems() {
        return facturaItems;
    }

    public void setFacturaItems(List<FacturaItemDto> facturaItems) {
        this.facturaItems = facturaItems;
    }

}
