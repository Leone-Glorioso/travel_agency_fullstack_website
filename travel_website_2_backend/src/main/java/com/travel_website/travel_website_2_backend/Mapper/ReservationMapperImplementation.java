package com.travel_website.travel_website_2_backend.Mapper;

import com.travel_website.travel_website_2_backend.Models.Reservation;
import org.springframework.stereotype.Service;

@Service
public class ReservationMapperImplementation implements ReservationMapper{

    @Override
    public Reservation toReserve(CreateReservationRequest createReservationRequest)
    {
        if(createReservationRequest == null){ return null; }
        return new Reservation(createReservationRequest.getDescription());
    }

    @Override
    public ReservationDto toReserveDto(Reservation reservation)
    {
        if(reservation == null){ return null; }
        ReservationDto.UserDto userDto = new ReservationDto.UserDto(reservation.getUsername());
        //TODO customize reservation needs
        return new ReservationDto(reservation.getId(), reservation.getDescription, userDto, reservation.getCreatedAt());
    }
}
