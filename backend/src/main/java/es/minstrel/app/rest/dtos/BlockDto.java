package es.minstrel.app.rest.dtos;

import java.util.List;

public class BlockDto<T> {

    private List<T> items;
    private long totalItems;

    public BlockDto() {
    }

    public BlockDto(List<T> items, long totalItems) {

        this.items = items;
        this.totalItems = totalItems;

    }

    public List<T> getItems() {
        return items;
    }

    public void setItems(List<T> items) {
        this.items = items;
    }

    public long getTotalItems() {
        return totalItems;
    }

    public void setTotalItems(long totalItems) {
        this.totalItems = totalItems;
    }
}
