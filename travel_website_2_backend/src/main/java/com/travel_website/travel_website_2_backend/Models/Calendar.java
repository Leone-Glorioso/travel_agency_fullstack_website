package com.travel_website.travel_website_2_backend.Models;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Objects;

@Entity
@Table(name = "calendar")
@IdClass(CalendarId.class)
public class Calendar {

    @Id
    @Column(name = "room")
    private int room;

    @Id
    @Column(name = "date")
    private LocalDate date;

    public int getRoom() {
        return room;
    }

    public void setRoom(int room) {
        this.room = room;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Calendar() {

    }

    public Calendar(int room, LocalDate date) {
        this.room = room;
        this.date = date;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Calendar calendar = (Calendar) o;
        return room == calendar.room && Objects.equals(date, calendar.date);
    }

    @Override
    public int hashCode() {
        return Objects.hash(room, date);
    }

    //TODO Calendar DtO(s)

    //TODO Calendar Mapper

    //TODO use calendar in controllers

    //TODO fix database/ add calendar
}
