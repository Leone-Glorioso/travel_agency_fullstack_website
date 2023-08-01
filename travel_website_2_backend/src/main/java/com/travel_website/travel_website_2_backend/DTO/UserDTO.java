package com.travel_website.travel_website_2_backend.DTO;

import com.travel_website.travel_website_2_backend.Models.UserCategories;

import java.time.LocalDate;

public record UserDTO(int id, String name, String surname, String email, long telephone, String photo, String country, UserCategories role, String username, String password) {
    public record ReservationDto(int id, LocalDate start, LocalDate end)
    {

    }
}
