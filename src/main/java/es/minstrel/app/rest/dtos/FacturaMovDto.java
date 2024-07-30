package es.minstrel.app.rest.dtos;

import java.util.List;

public class FacturaMovDto extends FacturaParamsDto {

    private Long conceptoId;
    private Long razonSocialId;
    private Long categoriaId;
    private Long cuentaId;

    public FacturaMovDto() {
    }

    public FacturaMovDto(long fecha, String codigo, String receptor, List<FacturaItemDto> facturaItems, Long conceptoId, Long razonSocialId, Long categoriaId, Long cuentaId) {
        super(fecha, codigo, receptor, facturaItems);
        this.conceptoId = conceptoId;
        this.razonSocialId = razonSocialId;
        this.categoriaId = categoriaId;
        this.cuentaId = cuentaId;
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

}
