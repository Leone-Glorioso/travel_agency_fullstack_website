package com.travel_website.travel_website_2_backend.Service;

import com.travel_website.travel_website_2_backend.Exception.Exception_ReservationDoesNotMatchClient;
import com.travel_website.travel_website_2_backend.Exception.Exception_ReservationNotFound;
import com.travel_website.travel_website_2_backend.Models.Reservation;
import com.travel_website.travel_website_2_backend.Models.Room;
import com.travel_website.travel_website_2_backend.Models.User;
import com.travel_website.travel_website_2_backend.Repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ReservationServiceImplementation implements ReservationService{
    private final ReservationRepository reservationRepository;

    @Override
    public List<Reservation> getReservations() {
        return reservationRepository.findAll(Sort.by(Sort.Direction.DESC));
    }

   /* @Override
    public List<Reservation> getReservationsContainingText(int id, String text) {
        return reservationRepository.findByIdContainingOrDescriptionContainingIgnoreCaseOrderByCreatedAt(id, text);
    }*/

    @Override
    public List<Reservation> getReservationsOfRoom(Room room)
    {
        return reservationRepository.findReservationsByBookedRoom(room);
    }

    @Override
    public List<Reservation> getReservationsOfClient(User client)
    {
        return reservationRepository.findReservationsByClient(client);
    }

    @Override
    public Reservation validateAndGetReservation(int id) {
        return reservationRepository.findById(id)
                .orElseThrow(() -> new Exception_ReservationNotFound(String.format("Order with id %s not found", id)));
    }

    @Override
    public Reservation saveReservation(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    @Override
    public void deleteReservation(Reservation reservation) {
        reservationRepository.delete(reservation);
    }

    @Override
    public void validateClientReservationConnection(User client, Reservation reservation)
    {
        if(!reservation.getClient().equals(client))
            throw new Exception_ReservationDoesNotMatchClient("Reservation with id " + reservation.getId() + " does not match client " + client.getUsername());
    }
}
