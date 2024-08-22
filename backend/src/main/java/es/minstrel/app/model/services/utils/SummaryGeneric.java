package es.minstrel.app.model.services.utils;

import java.math.BigDecimal;

public class SummaryGeneric {

    private String name;

    private BigDecimal gasto;

    private BigDecimal ingreso;

    public SummaryGeneric(String name) {
        this.name = name;
        this.gasto = new BigDecimal(0);
        this.ingreso = new BigDecimal(0);
    }

    public void addGasto(BigDecimal gasto) {
        this.gasto = this.gasto.add(gasto);
    }

    public void addIngreso(BigDecimal ingreso) {
        this.ingreso = this.ingreso.add(ingreso);
    }

    public String getName() {
        return name;
    }

    public BigDecimal getGasto() {
        return gasto;
    }

    public BigDecimal getIngreso() {
        return ingreso;
    }
}
