package es.minstrel.app.model.services.utils;

import java.util.List;

public class Block<T> {

    private List<T> items;
    private long totalItems;

    public Block(List<T> items, long totalItems) {

        this.items = items;
        this.totalItems = totalItems;

    }

    public List<T> getItems() {
        return items;
    }

    public long getTotalItems() {
        return totalItems;
    }

}

