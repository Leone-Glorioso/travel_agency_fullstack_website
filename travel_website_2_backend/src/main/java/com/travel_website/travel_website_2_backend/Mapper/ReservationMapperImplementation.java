package com.travel_website.travel_website_2_backend.Mapper;

import com.travel_website.travel_website_2_backend.Models.Reservation;
import com.travel_website.travel_website_2_backend.DTO.ReservationDTO;
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
    public ReservationDTO toReserveDto(Reservation reservation)
    {
        if(reservation == null){ return null; }
        ReservationDTO.UserDto userDto = new ReservationDTO.UserDto(reservation.getClient().getUsername());
        //TODO customize reservation needs
        return new ReservationDTO(reservation.getId(), reservation.getClient(), reservation.getBooked_room() , reservation.getPpn() ,reservation.getStart(), reservation.getEnd());
    }
}
