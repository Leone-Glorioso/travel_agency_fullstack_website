package com.travel_website.travel_website_2_backend.Mapper;

import com.travel_website.travel_website_2_backend.DTO.NewRoomRequest;
import com.travel_website.travel_website_2_backend.DTO.RoomDTO;
import com.travel_website.travel_website_2_backend.Models.Room;

public interface RoomMapper {
    Room newRoom(NewRoomRequest roomRequest);

    RoomDTO toRoomDTO(Room room);
}
