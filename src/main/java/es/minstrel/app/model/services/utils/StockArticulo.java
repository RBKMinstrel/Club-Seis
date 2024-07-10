package es.minstrel.app.model.services.utils;

import java.util.List;

public class StockArticulo {

    private Long idArticulo;
    private String nameArticulo;
    private List<StockTalla> stockTallas;

    public StockArticulo() {
    }

    public StockArticulo(Long idArticulo, List<StockTalla> stockTallas) {
        this.idArticulo = idArticulo;
        this.stockTallas = stockTallas;
    }

    public StockArticulo(Long idArticulo, String nameArticulo, List<StockTalla> stockTallas) {
        this.idArticulo = idArticulo;
        this.nameArticulo = nameArticulo;
        this.stockTallas = stockTallas;
    }

    public Long getIdArticulo() {
        return idArticulo;
    }

    public void setIdArticulo(Long idArticulo) {
        this.idArticulo = idArticulo;
    }

    public String getNameArticulo() {
        return nameArticulo;
    }

    public void setNameArticulo(String nameArticulo) {
        this.nameArticulo = nameArticulo;
    }

    public List<StockTalla> getStockTallas() {
        return stockTallas;
    }

    public void setStockTallas(List<StockTalla> stockTallas) {
        this.stockTallas = stockTallas;
    }
}
