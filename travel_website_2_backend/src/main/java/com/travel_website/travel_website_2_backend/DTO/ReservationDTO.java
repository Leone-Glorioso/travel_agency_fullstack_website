package com.travel_website.travel_website_2_backend.DTO;

import com.travel_website.travel_website_2_backend.Models.Room;
import com.travel_website.travel_website_2_backend.Models.User;

import java.time.LocalDate;

public record ReservationDTO(int id, int ppn, LocalDate start, LocalDate end) {
    public record UserDto(String Username)
    {

    }

    public record RoomDto(int id)
    {

    }
}
