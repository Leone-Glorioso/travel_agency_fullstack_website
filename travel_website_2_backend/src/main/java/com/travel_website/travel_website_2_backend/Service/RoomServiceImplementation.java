package com.travel_website.travel_website_2_backend.Service;

import com.travel_website.travel_website_2_backend.Models.Location;
import com.travel_website.travel_website_2_backend.Models.Room;
import com.travel_website.travel_website_2_backend.Models.TypeOfRoom;
import com.travel_website.travel_website_2_backend.Models.User;
import com.travel_website.travel_website_2_backend.Repository.ReservationRepository;
import com.travel_website.travel_website_2_backend.Repository.RoomRepository;
import com.travel_website.travel_website_2_backend.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@RequiredArgsConstructor
@Service
public class RoomServiceImplementation implements RoomService{

    private final RoomRepository roomRepository;
    private final UserRepository userRepository;
    @Override
    public List<Room> getRooms()
    {
        return roomRepository.findAll(Sort.by(Sort.Direction.DESC));
    }

    @Override
    public List<Room> getRoomsByLandlord(User landlord)
    {
        //TODO fix
        return roomRepository.findAll();
    }

    @Override
    public List<Room> getRoomsInLocation(Location location)
    {
        return roomRepository.findRoomsByLocation(location);
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
                                            boolean elevator)
    {
        Collection<Room> collection = roomRepository.findAll();
        collection.retainAll(roomRepository.findRoomsByTypeofroom(typeOfRoom));
        collection.retainAll(roomRepository.findRoomsByNumOfBeds(numofbeds));
        collection.retainAll(roomRepository.findRoomsByNumOfBaths(numofbaths));
        collection.retainAll(roomRepository.findRoomsByNumOfBedrooms(numofbedrooms));
        collection.retainAll(roomRepository.findRoomsByArea(area));
        collection.retainAll(roomRepository.findRoomsByLiving_room(livingroom));
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
        List<Room> returnList = new ArrayList<>(collection);
        return returnList;
    }
}
