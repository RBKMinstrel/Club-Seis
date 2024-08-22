package es.minstrel.app.rest.dtos;

import java.math.BigDecimal;

public class SummaryGenericDto {

    private String name;

    private BigDecimal gasto;

    private BigDecimal ingreso;

    public SummaryGenericDto() {
    }

    public SummaryGenericDto(String name, BigDecimal gasto, BigDecimal ingreso) {
        this.name = name;
        this.gasto = gasto;
        this.ingreso = ingreso;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getGasto() {
        return gasto;
    }

    public void setGasto(BigDecimal gasto) {
        this.gasto = gasto;
    }

    public BigDecimal getIngreso() {
        return ingreso;
    }

    public void setIngreso(BigDecimal ingreso) {
        this.ingreso = ingreso;
    }
}
