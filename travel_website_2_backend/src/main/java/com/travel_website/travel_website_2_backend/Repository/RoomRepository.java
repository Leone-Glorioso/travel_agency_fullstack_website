package com.travel_website.travel_website_2_backend.Repository;

import com.travel_website.travel_website_2_backend.Models.Location;
import com.travel_website.travel_website_2_backend.Models.Room;
import com.travel_website.travel_website_2_backend.Models.TypeOfRoom;
import com.travel_website.travel_website_2_backend.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Integer> {
    Optional<Room> findById(int id);

    boolean existsById(int id);

    List<Room> findRoomsByTypeofroom(TypeOfRoom typeOfRoom);

    List<Room> findRoomsByNumOfBeds(int numOfBeds);
    List<Room> findRoomsByNumOfBaths(int numOfBaths);
    List<Room> findRoomsByNumOfBedrooms(int numOfBedrooms);

    List<Room> findRoomsByArea(int area);

    List<Room> findRoomsByLivingRoom(boolean livingRoom);
    List<Room> findRoomsBySmoking(boolean smoking);
    List<Room> findRoomsByPets(boolean pets);
    List<Room> findRoomsByEvents(boolean events);

    List<Room> findRoomsByInternet(boolean internet);
    List<Room> findRoomsByCooling(boolean cooling);
    List<Room> findRoomsByHeating(boolean heating);
    List<Room> findRoomsByKitchen(boolean kitchen);
    List<Room> findRoomsByTv(boolean tv);
    List<Room> findRoomsByParking(boolean parking);
    List<Room> findRoomsByElevator(boolean elevator);

    List<Room> findRoomsByLocation(Location location);

    List<Room> findRoomsByLandlord(User landlord);

    List<Room> findByAreaBetween(int start, int end);

    List<Room> findByNumOfBathsBetween(int start, int end);

    List<Room> findByNumOfBedsBetween(int start, int end);

    List<Room> findByNumOfBedroomsBetween(int start, int end);

    List<Room> findByName(String name);

    boolean existsByName(String name);

}
