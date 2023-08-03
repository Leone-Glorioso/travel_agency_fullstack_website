package com.travel_website.travel_website_2_backend.Mapper;

import com.travel_website.travel_website_2_backend.DTO.LandlordDTO;
import com.travel_website.travel_website_2_backend.Models.Room;
import com.travel_website.travel_website_2_backend.Models.User;

public class LandlordMapperImplementation implements LandlordMapper{
    @Override
    public LandlordDTO toLandlordDTO(User landlord)
    {
        if(landlord == null)
            return null;
        return new LandlordDTO(landlord.getId(), landlord.getName(), landlord.getSurname(), landlord.getEmail(), landlord.getTelephone(), landlord.getPhoto(), landlord.getCountry(), landlord.getUsername(), landlord.getPassword());
    }

    public LandlordDTO.RoomDto toLanlordDTOtoRoomDto(Room room)
    {
        if(room == null)
            return null;
        return new LandlordDTO.RoomDto(room.getId());
    }

}
