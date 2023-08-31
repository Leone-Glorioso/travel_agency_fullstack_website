package com.travel_website.travel_website_2_backend.Mapper;

import com.travel_website.travel_website_2_backend.DTO.NewRoomRequest;
import com.travel_website.travel_website_2_backend.DTO.RoomDTO;
import com.travel_website.travel_website_2_backend.Exception.Exception_NonExcistentRoomType;
import com.travel_website.travel_website_2_backend.Models.Location;
import com.travel_website.travel_website_2_backend.Models.Room;
import com.travel_website.travel_website_2_backend.Models.TypeOfRoom;
import com.travel_website.travel_website_2_backend.Repository.LocationRepository;
import com.travel_website.travel_website_2_backend.Service.LocationService;
import org.springframework.stereotype.Service;

@Service
public class RoomMapperImplementation implements RoomMapper{


    @Override
    public Room newRoom(NewRoomRequest roomRequest)
    {

        if(roomRequest == null)
            return null;
        TypeOfRoom tpr;
        if(roomRequest.getTypeofroom().equals("private_room"))
            tpr = TypeOfRoom.private_room;
        else if (roomRequest.getTypeofroom().equals("hostel"))
            tpr = TypeOfRoom.hostel;
        else if (roomRequest.getTypeofroom().equals("house"))
            tpr = TypeOfRoom.house;
        else
            throw new Exception_NonExcistentRoomType("Room type " + roomRequest.getTypeofroom() + " does not exist");
        return new Room(roomRequest.getName(), tpr, roomRequest.getNumOfBeds(), roomRequest.getNumOfBaths(), roomRequest.getNumOfBedrooms(), roomRequest.isLivingRoom(),
                roomRequest.getArea(), roomRequest.getDescription(), roomRequest.isSmoking(), roomRequest.isPets(), roomRequest.isEvents(), roomRequest.getMinimumDays(),
                roomRequest.isInternet(), roomRequest.isCooling(), roomRequest.isHeating(), roomRequest.isKitchen(), roomRequest.isTv(),
                roomRequest.isParking(), roomRequest.isElevator());
    }

    @Override
    public RoomDTO toRoomDTO(Room room)
    {
        if(room == null)
            return null;
        return new RoomDTO(room.getId(), room.getName(), room.getTypeofroom(), room.getNumOfBeds(), room.getNumOfBaths(), room.getNumOfBedrooms(), room.getArea(), room.isLivingRoom(), room.isSmoking(),
                room.isPets(), room.isEvents(), room.isInternet(), room.isCooling(), room.isHeating(), room.isKitchen(), room.isTv(), room.isParking(), room.isElevator(),
                room.getDescription());
    }
}
