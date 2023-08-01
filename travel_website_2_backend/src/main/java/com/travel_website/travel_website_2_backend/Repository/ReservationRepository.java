package com.travel_website.travel_website_2_backend.Repository;

import com.travel_website.travel_website_2_backend.Models.Reservation;
import com.travel_website.travel_website_2_backend.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Integer> {

    Optional<Reservation> findById(int id);
    List<Reservation> findAllByReservationByCreatedAtDesc();

    List<Reservation> findByIdContainingOrDescriptionContainingIgnoreCaseOrderByCreatedAt(int id, String description);

}
