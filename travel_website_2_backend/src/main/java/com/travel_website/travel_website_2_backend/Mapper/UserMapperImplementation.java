package com.travel_website.travel_website_2_backend.Mapper;

import com.travel_website.travel_website_2_backend.DTO.UserDTO;
import com.travel_website.travel_website_2_backend.Models.Reservation;
import com.travel_website.travel_website_2_backend.Models.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserMapperImplementation implements UserMapper{
    @Override
    public UserDTO toUserDto(User user) {
        if (user == null) {
            return null;
        }
//        List<UserDTO.ReservationDto> orders = user.getOrders().stream().map(this::toUserDtoOrderDto).toList();
        return new UserDTO(user.getId(), user.getName(), user.getSurname(), user.getEmail(), user.getTelephone(), user.getPhoto(), user.getCountry(), user.getRole(), user.getUsername(), user.getPassword());
    }

    private UserDTO.ReservationDto toUserDtoReservationDto(Reservation reservation) {
        if (reservation == null) {
            return null;
        }
        return new UserDTO.ReservationDto(reservation.getId(), reservation.getStart(), reservation.getEnd());
    }
}
