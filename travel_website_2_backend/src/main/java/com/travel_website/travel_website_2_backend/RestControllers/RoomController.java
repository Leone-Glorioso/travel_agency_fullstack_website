package com.travel_website.travel_website_2_backend.RestControllers;

import com.travel_website.travel_website_2_backend.DTO.CreateReservationRequest;
import com.travel_website.travel_website_2_backend.DTO.NewRoomRequest;
import com.travel_website.travel_website_2_backend.DTO.ReservationDTO;
import com.travel_website.travel_website_2_backend.DTO.RoomDTO;
import com.travel_website.travel_website_2_backend.Mapper.ReservationMapper;
import com.travel_website.travel_website_2_backend.Mapper.RoomMapper;
import com.travel_website.travel_website_2_backend.Models.Location;
import com.travel_website.travel_website_2_backend.Models.Reservation;
import com.travel_website.travel_website_2_backend.Models.Room;
import com.travel_website.travel_website_2_backend.Models.User;
import com.travel_website.travel_website_2_backend.Security.Data_UserDetails;
import com.travel_website.travel_website_2_backend.Service.LocationService;
import com.travel_website.travel_website_2_backend.Service.ReservationService;
import com.travel_website.travel_website_2_backend.Service.RoomService;
import com.travel_website.travel_website_2_backend.Service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
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

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/all")
    public List<RoomDTO> getRooms()
    {
        return roomService.getRooms().stream()
                .map(roomMapper::toRoomDTO)
                .collect(Collectors.toList());
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @PostMapping
    public RoomDTO createRoom(@AuthenticationPrincipal Data_UserDetails currentUser,
                              @Valid @RequestBody NewRoomRequest newRoomRequest)
    {
        User landlord = userService.validateAndGetUserByUsername(currentUser.getUsername());
        Room room = roomMapper.newRoom(newRoomRequest);
        room.setLandlord(landlord);
        locationService.saveLocation(room.getLocation());
        roomService.saveRoom(room);
        return roomMapper.toRoomDTO(room);
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
    @GetMapping("/location/{id}")
    public List<RoomDTO> getRoomsInLocation(@PathVariable Location location)
    {
        return roomService.getRoomsInLocation(location).stream().map(roomMapper::toRoomDTO).collect(Collectors.toList());
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/room/{id}")
    public ReservationDTO createReservation(@AuthenticationPrincipal Data_UserDetails currentUser,
                                            @Valid @RequestBody CreateReservationRequest reservationRequest,
                                            @PathVariable @NotBlank int id)
    {
        User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
        userService.validateClient(user);
        Room room = roomService.validateAndGetRoom(id);
        Reservation reservation = reservationMapper.toReserve(reservationRequest);
        reservation.setBookedRoom(room);
        reservation.setClient(user);
        reservationService.saveReservation(reservation);
        return reservationMapper.toReserveDto(reservation);
    }

}
