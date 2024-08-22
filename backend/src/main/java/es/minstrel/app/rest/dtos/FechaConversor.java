package es.minstrel.app.rest.dtos;

import java.time.LocalDate;

public class FechaConversor {

    private FechaConversor() {
    }

    public final static long toDays(LocalDate date) {
        return date.toEpochDay();
    }

    public final static LocalDate fromDays(Long millis) {
        if (millis != null)
            return LocalDate.ofEpochDay(millis);
        else
            return null;
    }
}
