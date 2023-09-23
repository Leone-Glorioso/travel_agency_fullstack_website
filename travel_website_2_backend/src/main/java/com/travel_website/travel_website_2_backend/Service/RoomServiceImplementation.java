package com.travel_website.travel_website_2_backend.Service;

import com.travel_website.travel_website_2_backend.Exception.Exception_NonExcistentRoomType;
import com.travel_website.travel_website_2_backend.Exception.Exception_RoomDoesNotMatchLandlord;
import com.travel_website.travel_website_2_backend.Exception.Exception_RoomNameIsUsed;
import com.travel_website.travel_website_2_backend.Exception.Exception_RoomNotFound;
import com.travel_website.travel_website_2_backend.Models.Location;
import com.travel_website.travel_website_2_backend.Models.Room;
import com.travel_website.travel_website_2_backend.Models.TypeOfRoom;
import com.travel_website.travel_website_2_backend.Models.User;
import com.travel_website.travel_website_2_backend.Repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.hibernate.dialect.SybaseSqmToSqlAstConverter;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class RoomServiceImplementation implements RoomService{

    private final RoomRepository roomRepository;
    private final LocationService locationService;
    @Override
    public List<Room> getRooms()
    {
        return roomRepository.findAll();//Sort.by(Sort.Direction.DESC));
    }

    @Override
    public List<Room> getRoomsByLandlord(User landlord)
    {
        return roomRepository.findRoomsByLandlord(landlord);
    }

    @Override
    public List<Room> getRoomsInLocation(Location location)
    {
        return roomRepository.findRoomsByLocation(location);
    }

    @Override
    public List<Room> getRoomsInLocations(List<Location> locations)
    {
        List<Room> rooms = new ArrayList<>();
        for(Location location : locations)
            rooms.addAll(roomRepository.findRoomsByLocation(location));
        return rooms;
    }

    @Override
    public Room saveRoom(Room room)
    {
        return roomRepository.save(room);
    }

    @Override
    public void deleteRoom(Room room)
    {
        roomRepository.delete(room);
    }

    @Override
    public List<Room> findRoomsWithCharacteristics(TypeOfRoom typeOfRoom,
                                            int numOfBeds,
                                            int numOfBaths,
                                            int numOfBedrooms,
                                            int area,
                                            boolean livingRoom,
                                            boolean smoking,
                                            boolean pets,
                                            boolean events,
                                            boolean internet,
                                            boolean cooling,
                                            boolean heating,
                                            boolean kitchen,
                                            boolean tv,
                                            boolean parking,
                                            boolean elevator)
    {
        Collection<Room> collection = roomRepository.findAll();
        collection.retainAll(roomRepository.findRoomsByTypeofroom(typeOfRoom));
        collection.retainAll(roomRepository.findRoomsByNumOfBeds(numOfBeds));
        collection.retainAll(roomRepository.findRoomsByNumOfBaths(numOfBaths));
        collection.retainAll(roomRepository.findRoomsByNumOfBedrooms(numOfBedrooms));
        collection.retainAll(roomRepository.findRoomsByArea(area));
        collection.retainAll(roomRepository.findRoomsByLivingRoom(livingRoom));
        collection.retainAll(roomRepository.findRoomsBySmoking(smoking));
        collection.retainAll(roomRepository.findRoomsByPets(pets));
        collection.retainAll(roomRepository.findRoomsByEvents(events));
        collection.retainAll(roomRepository.findRoomsByInternet(internet));
        collection.retainAll(roomRepository.findRoomsByCooling(cooling));
        collection.retainAll(roomRepository.findRoomsByHeating(heating));
        collection.retainAll(roomRepository.findRoomsByKitchen(kitchen));
        collection.retainAll(roomRepository.findRoomsByTv(tv));
        collection.retainAll(roomRepository.findRoomsByParking(parking));
        collection.retainAll(roomRepository.findRoomsByElevator(elevator));
        return new ArrayList<>(collection);
    }

    @Override
    public Room validateAndGetRoom(int id)
    {
        return roomRepository.findById(id)
                .orElseThrow(() -> new Exception_RoomNotFound("Room not found"));
    }

    @Override
    public void validateRoomLandlordConnection(User landlord, Room room)
    {
        if(!room.getLandlord().equals(landlord))
            throw new Exception_RoomDoesNotMatchLandlord("Room with id " + room.getId() + " does not match landlord " + landlord.getUsername());
    }

    @Override
    public List<Room> getRoomsForAmountOfPeople(int people)
    {
        return roomRepository.findRoomsByNumOfBeds(people);
    }


    @Override
    public List<Room> getRoomsByNumOfBeds(int start_numofbeds, int end_numofbeds)
    {
        return roomRepository.findByNumOfBedsBetween(start_numofbeds, end_numofbeds);
    }

    @Override
    public List<Room> getRoomsByNumOfBedrooms(int start_numofbedrooms, int end_numofbedrooms)
    {
        return roomRepository.findByNumOfBedroomsBetween(start_numofbedrooms, end_numofbedrooms);
    }

    @Override
    public List<Room> getRoomsByNumOfBaths(int start_numofbaths, int end_numofbaths)
    {
        return roomRepository.findByNumOfBathsBetween(start_numofbaths, end_numofbaths);
    }

    @Override
    public List<Room> getRoomsByType(String type)
    {
        if(type.equals("private_room"))
            return roomRepository.findRoomsByTypeofroom(TypeOfRoom.private_room);
        else if(type.equals("house"))
            return roomRepository.findRoomsByTypeofroom(TypeOfRoom.house);
        else if(type.equals("hostel"))
            return roomRepository.findRoomsByTypeofroom(TypeOfRoom.hostel);
        else
            throw new Exception_NonExcistentRoomType("Room type does not exist");
    }

    @Override
    public List<Room> getRoomsByAreaRange(int start_area, int end_area)
    {
        return roomRepository.findByAreaBetween(start_area, end_area);
    }


    @Override
    public List<Room> getIfLivingRoom(boolean option)
    {
        return roomRepository.findRoomsByLivingRoom(option);
    }

    @Override
    public List<Room> getIfSmoking(boolean option)
    {
        return roomRepository.findRoomsBySmoking(option);
    }

    @Override
    public List<Room> getIfPets(boolean option)
    {
        return roomRepository.findRoomsByPets(option);
    }

    @Override
    public List<Room> getIfEvents(boolean option)
    {
        return roomRepository.findRoomsByEvents(option);
    }

    @Override
    public List<Room> getIfInternet(boolean option)
    {
        return roomRepository.findRoomsByInternet(option);
    }

    @Override
    public List<Room> getIfCooling(boolean option)
    {
        return roomRepository.findRoomsByCooling(option);
    }

    @Override
    public List<Room> getIfHeating(boolean option)
    {
        return roomRepository.findRoomsByHeating(option);
    }

    @Override
    public List<Room> getIfKitchen(boolean option)
    {
        return roomRepository.findRoomsByKitchen(option);
    }

    @Override
    public List<Room> getIfTV(boolean option)
    {
        return roomRepository.findRoomsByTv(option);
    }

    @Override
    public List<Room> getIfParking(boolean option)
    {
        return roomRepository.findRoomsByParking(option);
    }

    @Override
    public List<Room> getIfElevator(boolean option)
    {
        return roomRepository.findRoomsByElevator(option);
    }


    @Override
    public void validateRoomNameIsUnique(String name)
    {
        if(roomRepository.existsByName(name))
            throw new Exception_RoomNameIsUsed("Name " + name + " is already in use");
    }

    @Override
    public Room validateAndGetRoomWithName(String name)
    {
        return roomRepository.findByName(name).stream().findFirst()
                .orElseThrow(() -> new Exception_RoomNotFound("Room with name " + name + " does not exist"));
    }

    @Override
    public List<Room> getRoomsInLocalArea(double latitude, double longitude, int area)
    {
        System.out.println(getRoomsInLocations(locationService.locationsInArea(latitude, longitude, area)).stream().map(Room::getId).collect(Collectors.toList()));
        return getRoomsInLocations(locationService.locationsInArea(latitude, longitude, area));
    }

    @Override
    public List<Room> getRoomsByTypes(String types)
    {
        String[] typesDiv = types.split(", ");
        List<String> type = Arrays.asList(typesDiv);
        Set<Room> rooms = new HashSet<>();
        if(type.contains("private_room"))
            rooms.addAll(roomRepository.findRoomsByTypeofroom(TypeOfRoom.private_room));
        if(type.contains("house"))
            rooms.addAll(roomRepository.findRoomsByTypeofroom(TypeOfRoom.house));
        if(type.contains("hostel"))
            rooms.addAll(roomRepository.findRoomsByTypeofroom(TypeOfRoom.hostel));
        if(type.size() != 0 && !type.contains("private_room") && !type.contains("house") && !type.contains("hostel"))
            throw new Exception_NonExcistentRoomType("Room type does not exist");
//        System.out.println(rooms.stream().map(Room::getId).collect(Collectors.toList()));
        return rooms.stream().collect(Collectors.toList());
    }

}
