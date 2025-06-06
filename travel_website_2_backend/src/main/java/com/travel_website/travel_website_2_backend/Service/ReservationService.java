package com.travel_website.travel_website_2_backend.Service;

import com.travel_website.travel_website_2_backend.Models.Reservation;
import com.travel_website.travel_website_2_backend.Models.Room;
import com.travel_website.travel_website_2_backend.Models.User;

import java.util.List;

public interface ReservationService {
    List<Reservation> getReservations();

    //List<Reservation> getReservationsContainingText(int id, String text);

    List<Reservation> getReservationsOfRoom(Room room);

    List<Reservation> getReservationsOfRooms(List<Room> rooms);

    List<Reservation> getReservationsOfClient(User client);

    Reservation validateAndGetReservation(int id);

    Reservation saveReservation(Reservation reservation);

    void deleteReservation(Reservation reservation);

    void validateClientReservationConnection(User client, Reservation reservation);

    void validateClientHasReservedRoom(User client, Room room);

    void validateRoomReservationConnection(Room room, Reservation reservation);

    boolean isReservationOfRoom(Reservation reservation, Room room);

    boolean isReservationByClient(Reservation reservation, User client);
}
