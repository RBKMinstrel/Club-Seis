package es.minstrel.app.model.services.utils;

public class StockTalla {

    private Long idTalla;
    private Long stock;

    public StockTalla() {
    }

    public StockTalla(Long idTalla, Long stock) {
        this.idTalla = idTalla;
        this.stock = stock;
    }

    public Long getIdTalla() {
        return idTalla;
    }

    public void setIdTalla(Long idTalla) {
        this.idTalla = idTalla;
    }


    public Long getStock() {
        return stock;
    }

    public void setStock(Long stock) {
        this.stock = stock;
    }
}
