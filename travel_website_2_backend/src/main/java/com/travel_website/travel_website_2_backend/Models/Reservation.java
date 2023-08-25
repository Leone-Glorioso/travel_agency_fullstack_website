package com.travel_website.travel_website_2_backend.Models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;
import java.util.Objects;

@Entity
@Table(name = "reservation")
public class Reservation {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    private User client;

    @ManyToOne
    private Room bookedRoom;

    @Column(name = "price_per_night")
    @NotBlank
    private int ppn;

    @Column(name = "start_date")
    @NotBlank
    private LocalDate start;

    @Column(name = "end_date")
    @NotBlank
    private LocalDate end;

//    public Reservation(User client, Room bookedRoom, int ppn, LocalDate start, LocalDate end) {
//        this.client = client;
//        this.bookedRoom = bookedRoom;
//        this.ppn = ppn;
//        this.start = start;
//        this.end = end;
//    }


    public Reservation(int ppn, LocalDate start, LocalDate end) {
        this.ppn = ppn;
        this.start = start;
        this.end = end;
    }

    public Reservation() {

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getClient() {
        return client;
    }

    public void setClient(User client) {
        this.client = client;
    }

    public Room getBookedRoom() {
        return bookedRoom;
    }

    public void setBookedRoom(Room booked_room) {
        this.bookedRoom = booked_room;
    }

    public int getPpn() {
        return ppn;
    }

    public void setPpn(int ppn) {
        this.ppn = ppn;
    }

    public LocalDate getStart() {
        return start;
    }

    public void setStart(LocalDate start) {
        this.start = start;
    }

    public LocalDate getEnd() {
        return end;
    }

    public void setEnd(LocalDate end) {
        this.end = end;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Reservation that = (Reservation) o;
        return id == that.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
