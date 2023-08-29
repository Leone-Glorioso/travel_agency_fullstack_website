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

    List<Room> getRoomsInLocations(List<Location> locations);

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

    List<Room> getRoomsForAmountOfPeople(int people);

    List<Room> getRoomsByNumOfBeds(int start_numofbeds, int end_numofbeds);

    List<Room> getRoomsByNumOfBedrooms(int start_numofbedrooms, int end_numofbedrooms);

    List<Room> getRoomsByNumOfBaths(int start_numofbaths, int end_numofbaths);

    List<Room> getRoomsByType(String type);

    List<Room> getRoomsByAreaRange(int start_area, int end_area);

    List<Room> getIfLivingRoom(boolean option);

    List<Room> getIfSmoking(boolean option);

    List<Room> getIfPets(boolean option);

    List<Room> getIfEvents(boolean option);

    List<Room> getIfInternet(boolean option);

    List<Room> getIfCooling(boolean option);

    List<Room> getIfHeating(boolean option);

    List<Room> getIfKitchen(boolean option);

    List<Room> getIfTV(boolean option);

    List<Room> getIfParking(boolean option);

    List<Room> getIfElevator(boolean option);
}
