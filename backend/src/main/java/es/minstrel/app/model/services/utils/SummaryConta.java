package es.minstrel.app.model.services.utils;

import java.util.ArrayList;
import java.util.List;

public class SummaryConta {

    private List<SummaryGeneric> conceptoSummaryList;

    private List<SummaryGeneric> categoriaSummaryList;

    private List<SummaryGeneric> cuentaSummaryList;

    public SummaryConta() {
        this.conceptoSummaryList = new ArrayList<>();
        this.categoriaSummaryList = new ArrayList<>();
        this.cuentaSummaryList = new ArrayList<>();
    }

    public List<SummaryGeneric> getConceptoSummaryList() {
        return conceptoSummaryList;
    }

    public List<SummaryGeneric> getCategoriaSummaryList() {
        return categoriaSummaryList;
    }

    public List<SummaryGeneric> getCuentaSummaryList() {
        return cuentaSummaryList;
    }

    public void addConceptoSummary(SummaryGeneric conceptoSummary) {
        this.conceptoSummaryList.add(conceptoSummary);
    }

    public void addCategoriaSummary(SummaryGeneric categoriaSummary) {
        this.categoriaSummaryList.add(categoriaSummary);
    }

    public void addCuentaSummary(SummaryGeneric cuentaSummary) {
        this.cuentaSummaryList.add(cuentaSummary);
    }
}
