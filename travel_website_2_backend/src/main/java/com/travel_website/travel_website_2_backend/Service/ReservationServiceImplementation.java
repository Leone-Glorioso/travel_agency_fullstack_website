package com.travel_website.travel_website_2_backend.Service;

import com.travel_website.travel_website_2_backend.Exception.Exception_ReservationNotFound;
import com.travel_website.travel_website_2_backend.Models.Reservation;
import com.travel_website.travel_website_2_backend.Repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ReservationServiceImplementation implements ReservationService{
    private final ReservationRepository reservationRepository;

    @Override
    public List<Reservation> getReservations() {
        return reservationRepository.findAllByReservationByCreatedAtDesc();
    }

    @Override
    public List<Reservation> getReservationsContainingText(int id, String text) {
        return reservationRepository.findByIdContainingOrDescriptionContainingIgnoreCaseOrderByCreatedAt(id, text);
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
}
