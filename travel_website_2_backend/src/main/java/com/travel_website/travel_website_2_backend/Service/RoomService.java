package com.travel_website.travel_website_2_backend.Service;

import com.travel_website.travel_website_2_backend.Models.Location;
import com.travel_website.travel_website_2_backend.Models.Room;
import com.travel_website.travel_website_2_backend.Models.TypeOfRoom;
import com.travel_website.travel_website_2_backend.Models.User;

import java.util.List;

public interface RoomService {
    List<Room> getRooms();

    List<Room> getRoomsByLandlord(User landlord);

    List<Room> getRoomsInLocation(Location location);

    Room saveRoom(Room room);

    void deleteRoom(Room room);

    List<Room> findRoomsWithCharacteristics(TypeOfRoom typeOfRoom,
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
                                            boolean elevator);

    Room validateAndGetRoom(int id);

    void validateRoomLandlordConnection(User landlord, Room room);
}
