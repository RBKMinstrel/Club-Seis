package es.minstrel.app.rest.dtos;

import java.util.List;

public class SummaryContaDto {

    private List<SummaryGenericDto> conceptoSummaryList;

    private List<SummaryGenericDto> categoriaSummaryList;

    private List<SummaryGenericDto> cuentaSummaryList;

    public SummaryContaDto() {
    }

    public SummaryContaDto(List<SummaryGenericDto> conceptoSummaryList, List<SummaryGenericDto> categoriaSummaryList, List<SummaryGenericDto> cuentaSummaryList) {
        this.conceptoSummaryList = conceptoSummaryList;
        this.categoriaSummaryList = categoriaSummaryList;
        this.cuentaSummaryList = cuentaSummaryList;
    }

    public List<SummaryGenericDto> getConceptoSummaryList() {
        return conceptoSummaryList;
    }

    public void setConceptoSummaryList(List<SummaryGenericDto> conceptoSummaryList) {
        this.conceptoSummaryList = conceptoSummaryList;
    }

    public List<SummaryGenericDto> getCategoriaSummaryList() {
        return categoriaSummaryList;
    }

    public void setCategoriaSummaryList(List<SummaryGenericDto> categoriaSummaryList) {
        this.categoriaSummaryList = categoriaSummaryList;
    }

    public List<SummaryGenericDto> getCuentaSummaryList() {
        return cuentaSummaryList;
    }

    public void setCuentaSummaryList(List<SummaryGenericDto> cuentaSummaryList) {
        this.cuentaSummaryList = cuentaSummaryList;
    }
}
