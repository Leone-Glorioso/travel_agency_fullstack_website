package com.travel_website.travel_website_2_backend.DTO;

import com.travel_website.travel_website_2_backend.Models.Location;
import com.travel_website.travel_website_2_backend.Models.TypeOfRoom;
import com.travel_website.travel_website_2_backend.Models.User;

public record RoomDTO(int id,
                      String name,
                      TypeOfRoom typeOfRoom,
                      int numofbeds,
                      int numofbaths,
                      int numofbedrooms,
                      int area,
                      boolean livingroom,
                      boolean smoking,
                      boolean pets,
                      boolean events,
                      boolean internet,
                      boolean cooling,
                      boolean heating,
                      boolean kitchen,
                      boolean tv,
                      boolean parking,
                      boolean elevator,
                      String description,
                      double latitude,
                      double longitude,
                      String address) {

//    public record LandlordDto(String username)
//    {
//
//    }
//
//    public record LocationDto(int id)
//    {
//
//    }
}
