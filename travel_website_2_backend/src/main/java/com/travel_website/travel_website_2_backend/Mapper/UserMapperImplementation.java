package com.travel_website.travel_website_2_backend.Mapper;

import com.travel_website.travel_website_2_backend.Models.Reservation;
import com.travel_website.travel_website_2_backend.Models.User;
import org.springframework.stereotype.Service;

@Service
public class UserMapperImplementation implements UserMapper{
    @Override
    public UserDto toUserDto(User user) {
        if (user == null) {
            return null;
        }
        List<UserDto.OrderDto> orders = user.getOrders().stream().map(this::toUserDtoOrderDto).toList();
        return new UserDto(user.getId(), user.getUsername(), user.getName(), user.getEmail(), user.getRole(), orders);
    }

    private UserDto.OrderDto toUserDtoReservationDto(Reservation reservation) {
        if (reservation == null) {
            return null;
        }
        //TODO configure that
        return new UserDto.ReservationDto(reservation.getId(), reservation.getDescription(), reservation.getCreatedAt());
    }
}
