package com.travel_website.travel_website_2_backend.Mapper;

import com.travel_website.travel_website_2_backend.DTO.CreateReservationRequest;
import com.travel_website.travel_website_2_backend.Models.Reservation;
import com.travel_website.travel_website_2_backend.DTO.ReservationDTO;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
public class ReservationMapperImplementation implements ReservationMapper{

    @Override
    public Reservation toReserve(CreateReservationRequest createReservationRequest)
    {
        if(createReservationRequest == null){ return null; }
        DateTimeFormatter format = DateTimeFormatter.ofPattern("dd/MM/uuuu");
        return new Reservation(createReservationRequest.getPpn() , LocalDate.parse(createReservationRequest.getStart(), format), LocalDate.parse(createReservationRequest.getEnd(), format));
    }

    @Override
    public ReservationDTO toReserveDto(Reservation reservation)
    {
        if(reservation == null){ return null; }
        ReservationDTO.UserDto userDto = new ReservationDTO.UserDto(reservation.getClient().getUsername());
        return new ReservationDTO(reservation.getId(), reservation.getPpn() ,reservation.getStart(), reservation.getEnd());
    }
}
