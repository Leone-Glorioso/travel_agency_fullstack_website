package com.travel_website.travel_website_2_backend.DTO;

import com.travel_website.travel_website_2_backend.Models.UserCategories;

public record LandlordDTO(int id, String name, String surname, String email, long telephone, String photo, String country, String username, String password) {
    public record RoomDto(int id)
    {

    }
}
