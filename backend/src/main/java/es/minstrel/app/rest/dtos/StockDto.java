package es.minstrel.app.rest.dtos;

public class StockDto extends TallaDto {

    private Long stock;

    public StockDto() {
        super();
    }

    public StockDto(Long tallaId, Long stock) {
        super(tallaId);
        this.stock = stock;
    }

    public StockDto(Long tallaId, String name, Long stock) {
        super(tallaId, name);
        this.stock = stock;
    }

    public Long getStock() {
        return stock;
    }

    public void setStock(Long stock) {
        this.stock = stock;
    }
}
