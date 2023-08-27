package com.travel_website.travel_website_2_backend.RestControllers;

import com.travel_website.travel_website_2_backend.DTO.*;
import com.travel_website.travel_website_2_backend.Mapper.LocationMapper;
import com.travel_website.travel_website_2_backend.Mapper.ReservationMapper;
import com.travel_website.travel_website_2_backend.Mapper.RoomMapper;
import com.travel_website.travel_website_2_backend.Misc.DateHelper;
import com.travel_website.travel_website_2_backend.Models.Location;
import com.travel_website.travel_website_2_backend.Models.Reservation;
import com.travel_website.travel_website_2_backend.Models.Room;
import com.travel_website.travel_website_2_backend.Models.User;
import com.travel_website.travel_website_2_backend.Security.Data_UserDetails;
import com.travel_website.travel_website_2_backend.Service.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.travel_website.travel_website_2_backend.Configuration.Configuration_Swagger.BEARER_KEY_SECURITY_SCHEME;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/rooms")
public class RoomController {
    private final UserService userService;
    private final RoomService roomService;
    private final RoomMapper roomMapper;
    private final ReservationService reservationService;
    private final ReservationMapper reservationMapper;
    private final LocationService locationService;
    private final CalendarService calendarService;
    private final DateHelper dateHelper;

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/all")
    public List<RoomDTO> getRooms()
    {
        return roomService.getRooms().stream()
                .map(roomMapper::toRoomDTO)
                .collect(Collectors.toList());
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(path = "/location/{id}")
    public CreatedResponse createRoom(@AuthenticationPrincipal Data_UserDetails currentUser,
                           @Valid @RequestBody NewRoomRequest newRoomRequest,
                              @Valid @PathVariable int id)
    {
        User landlord = userService.validateAndGetUserByUsername(currentUser.getUsername());
        Location location = locationService.validateAndGetLocation(id);
        Room room = roomMapper.newRoom(newRoomRequest);
        room.setLandlord(landlord);
        room.setLocation(location);
        Room room1 = roomService.saveRoom(room);
        return new CreatedResponse("room", room1.getId());
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @DeleteMapping
    public RoomDTO deleteRoom(@PathVariable int id)
    {
        Room room = roomService.validateAndGetRoom(id);
        roomService.deleteRoom(room);
        return roomMapper.toRoomDTO(room);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/search/{id}")
    public RoomDTO getRoom(@PathVariable int id)
    {
        return roomMapper.toRoomDTO(roomService.validateAndGetRoom(id));
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/me")
    public List<RoomDTO> getMyRooms(@AuthenticationPrincipal Data_UserDetails currentUser)
    {
        User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
        userService.validateLandlord(user);
        return roomService.getRoomsByLandlord(user).stream().map(roomMapper::toRoomDTO).collect(Collectors.toList());
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/landlord/{username}")
    public List<RoomDTO> getRoomsByLandlord(@PathVariable String username)
    {
        User user = userService.validateAndGetUserByUsername(username);
        userService.validateLandlord(user);
        return roomService.getRoomsByLandlord(user).stream().map(roomMapper::toRoomDTO).collect(Collectors.toList());
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/me/{id}")
    public RoomDTO getMyRoom(@AuthenticationPrincipal Data_UserDetails currentUser, @PathVariable int id)
    {
        User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
        userService.validateLandlord(user);
        Room room = roomService.validateAndGetRoom(id);
        roomService.validateRoomLandlordConnection(user, room);
        return roomMapper.toRoomDTO(room);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/landlord/{username}/room/{id}")
    public RoomDTO getRoomByLandlord(@PathVariable String username, @PathVariable int id)
    {
        User user = userService.validateAndGetUserByUsername(username);
        userService.validateLandlord(user);
        Room room = roomService.validateAndGetRoom(id);
        roomService.validateRoomLandlordConnection(user, room);
        return roomMapper.toRoomDTO(room);
    }

    //TODO change location to something else (will not test today)
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/location/{latitude}/{longitude}")
    public List<RoomDTO> getRoomsInLocation(@PathVariable double latitude,
                                            @PathVariable double longitude)
    {
        Location location = locationService.validateAndGetLocationFromPosition(latitude, longitude);
        return roomService.getRoomsInLocation(location).stream().map(roomMapper::toRoomDTO).collect(Collectors.toList());
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/room/{id}")
    public CreatedResponse createReservation(@AuthenticationPrincipal Data_UserDetails currentUser,
                                            @Valid @RequestBody CreateReservationRequest reservationRequest,
                                            @PathVariable @NotBlank int id)
    {
        User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
        userService.validateClient(user);
        Room room = roomService.validateAndGetRoom(id);
        Reservation reservation = reservationMapper.toReserve(reservationRequest);
        reservation.setBookedRoom(room);
        reservation.setClient(user);
        Reservation reservation1 = reservationService.saveReservation(reservation);
        return new CreatedResponse("reservation", reservation1.getId());
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("search/{location_id}/{start_date}/{end_date}/{numOfPeople}")
    public List<RoomDTO> initialSearch(@PathVariable int location_id,
                                       @PathVariable String start_date,
                                       @PathVariable String end_date,
                                       @PathVariable int numOfPeople)
    {
        Location location = locationService.validateAndGetLocation(location_id);
        Set<Integer> roomNums = calendarService.roomsAvailableBetweenDates(dateHelper.stringToDate2(start_date), dateHelper.stringToDate2(end_date));
        System.out.print(roomNums);
        List<Room> rooms = new ArrayList<>();
        for(int room : roomNums)
            rooms.add(roomService.validateAndGetRoom(room));
        Collection<Room> collection= roomService.getRoomsInLocation(location);
        collection.retainAll(roomService.getRoomsForAmountOfPeople(numOfPeople));
        collection.retainAll(rooms);
        return collection.stream().map(roomMapper::toRoomDTO).collect(Collectors.toList());
    }

}
