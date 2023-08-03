package com.travel_website.travel_website_2_backend.Mapper;

import com.travel_website.travel_website_2_backend.DTO.NewRoomRequest;
import com.travel_website.travel_website_2_backend.DTO.RoomDTO;
import com.travel_website.travel_website_2_backend.Models.Room;

public class RoomMapperImplementation implements RoomMapper{
    @Override
    public Room newRoom(NewRoomRequest roomRequest)
    {
        if(roomRequest == null)
            return null;
        return new Room(roomRequest.getTypeofroom(), roomRequest.getNumOfBeds(), roomRequest.getNumOfBaths(), roomRequest.getNumOfBedrooms(), roomRequest.isLivingRoom(),
                roomRequest.getArea(), roomRequest.getDescription(), roomRequest.isSmoking(), roomRequest.isPets(), roomRequest.isEvents(), roomRequest.getMinimumDays(),
                roomRequest.getLocation(), roomRequest.isInternet(), roomRequest.isCooling(), roomRequest.isHeating(), roomRequest.isKitchen(), roomRequest.isTv(),
                roomRequest.isParking(), roomRequest.isElevator());
    }

    @Override
    public RoomDTO toRoomDTO(Room room)
    {
        if(room == null)
            return null;
        return new RoomDTO(room.getTypeofroom(), room.getNumOfBeds(), room.getNumOfBaths(), room.getNumOfBedrooms(), room.getArea(), room.isLivingRoom(), room.isSmoking(),
                room.isPets(), room.isEvents(), room.isInternet(), room.isCooling(), room.isHeating(), room.isKitchen(), room.isTv(), room.isParking(), room.isElevator(),
                room.getDescription(), room.getLandlord(), room.getLocation());
    }
}
