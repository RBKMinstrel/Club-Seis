package es.minstrel.app.rest.dtos;

import java.util.List;

public class ArticuloStockDto {
    private Long id;
    private String name;
    private List<StockDto> stockList;

    public ArticuloStockDto() {
    }

    public ArticuloStockDto(Long id, String name, List<StockDto> stockList) {
        this.id = id;
        this.name = name;
        this.stockList = stockList;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<StockDto> getStockList() {
        return stockList;
    }

    public void setStockList(List<StockDto> stockList) {
        this.stockList = stockList;
    }
}
