package com.travel_website.travel_website_2_backend.Models;


import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

public class CalendarId implements Serializable {
    private int room;

    private LocalDate date;

    public CalendarId() {

    }

    public CalendarId(int room, LocalDate date) {
        this.room = room;
        this.date = date;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CalendarId that = (CalendarId) o;
        return room == that.room && Objects.equals(date, that.date);
    }

    @Override
    public int hashCode() {
        return Objects.hash(room, date);
    }
}
