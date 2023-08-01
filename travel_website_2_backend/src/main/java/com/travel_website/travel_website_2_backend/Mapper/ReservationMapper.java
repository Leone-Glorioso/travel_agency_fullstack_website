package com.travel_website.travel_website_2_backend.Mapper;

import com.travel_website.travel_website_2_backend.DTO.CreateReservationRequest;
import com.travel_website.travel_website_2_backend.DTO.ReservationDTO;
import com.travel_website.travel_website_2_backend.Models.Reservation;

public interface ReservationMapper {

    Reservation toReserve(CreateReservationRequest createReservationRequest);

    ReservationDTO toReserveDto(Reservation reservation);
}
