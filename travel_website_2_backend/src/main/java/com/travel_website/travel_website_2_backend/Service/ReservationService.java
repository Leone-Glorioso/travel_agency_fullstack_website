package com.travel_website.travel_website_2_backend.Service;

import com.travel_website.travel_website_2_backend.Models.Reservation;

import java.util.List;

public interface ReservationService {
    List<Reservation> getReservations();

    List<Reservation> getReservationsContainingText(int id, String text);

    Reservation validateAndGetReservation(int id);

    Reservation saveReservation(Reservation reservation);

    void deleteReservation(Reservation reservation);
}
