package es.minstrel.app.rest.dtos;

import java.math.BigDecimal;

public class RecibiDto {

    private Long conceptoId;
    private Long razonSocialId;
    private Long categoriaId;
    private Long cuentaId;
    private String receptor;
    private String receptorRol;
    private String emisor;
    private BigDecimal precio;
    private String concepto;

    public RecibiDto() {
    }

    public RecibiDto(Long conceptoId, Long razonSocialId, Long categoriaId, Long cuentaId, String receptor,
                     String receptorRol, String emisor, BigDecimal precio, String concepto) {
        this.conceptoId = conceptoId;
        this.razonSocialId = razonSocialId;
        this.categoriaId = categoriaId;
        this.cuentaId = cuentaId;
        this.receptor = receptor;
        this.receptorRol = receptorRol;
        this.emisor = emisor;
        this.precio = precio;
        this.concepto = concepto;
    }

    public Long getConceptoId() {
        return conceptoId;
    }

    public void setConceptoId(Long conceptoId) {
        this.conceptoId = conceptoId;
    }

    public Long getRazonSocialId() {
        return razonSocialId;
    }

    public void setRazonSocialId(Long razonSocialId) {
        this.razonSocialId = razonSocialId;
    }

    public Long getCategoriaId() {
        return categoriaId;
    }

    public void setCategoriaId(Long categoriaId) {
        this.categoriaId = categoriaId;
    }

    public Long getCuentaId() {
        return cuentaId;
    }

    public void setCuentaId(Long cuentaId) {
        this.cuentaId = cuentaId;
    }

    public String getReceptor() {
        return receptor;
    }

    public void setReceptor(String receptor) {
        this.receptor = receptor;
    }

    public String getReceptorRol() {
        return receptorRol;
    }

    public void setReceptorRol(String receptorRol) {
        this.receptorRol = receptorRol;
    }

    public String getEmisor() {
        return emisor;
    }

    public void setEmisor(String emisor) {
        this.emisor = emisor;
    }

    public BigDecimal getPrecio() {
        return precio;
    }

    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }

    public String getConcepto() {
        return concepto;
    }

    public void setConcepto(String concepto) {
        this.concepto = concepto;
    }
}
