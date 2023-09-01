package com.travel_website.travel_website_2_backend.RestControllers;

import com.travel_website.travel_website_2_backend.DTO.CreateReservationRequest;
import com.travel_website.travel_website_2_backend.DTO.ReservationDTO;
import com.travel_website.travel_website_2_backend.DTO.RoomDTO;
import com.travel_website.travel_website_2_backend.Exception.Exception_ReservationNotFound;
import com.travel_website.travel_website_2_backend.Mapper.ReservationMapper;
import com.travel_website.travel_website_2_backend.Models.Reservation;
import com.travel_website.travel_website_2_backend.Models.Room;
import com.travel_website.travel_website_2_backend.Models.User;
import com.travel_website.travel_website_2_backend.Models.UserCategories;
import com.travel_website.travel_website_2_backend.Security.Data_UserDetails;
import com.travel_website.travel_website_2_backend.Service.RequestService;
import com.travel_website.travel_website_2_backend.Service.ReservationService;
import com.travel_website.travel_website_2_backend.Service.RoomService;
import com.travel_website.travel_website_2_backend.Service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.travel_website.travel_website_2_backend.Configuration.Configuration_Swagger.BEARER_KEY_SECURITY_SCHEME;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final UserService userService;
    private final ReservationService reservationService;
    private final RoomService roomService;
    private final ReservationMapper reservationMapper;
    private final RequestService requestService;

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/all")
    public List<ReservationDTO> getAllReservations()
    {
        return reservationService.getReservations().stream().map(reservationMapper::toReserveDto).collect(Collectors.toList());
    }

//    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
//    @GetMapping("/search")
//    public List<ReservationDTO> getReservationsByBookerAndRoom(@RequestParam(required = false) String username, @RequestParam(required = false) int roomId) {
//        User client = userService.validateAndGetUserByUsername(username);
//        Room room = roomService.validateAndGetRoom(roomId);
//        Collection<Reservation> col = new ArrayList<>(reservationService.getReservations());
//        if(client != null) {
//             col.retainAll(reservationService.getReservationsOfClient(client));
//        }
//        if (room != null) {
//            col.retainAll(reservationService.getReservationsOfRoom(room));
//        }
//        List<Reservation> reservations = new ArrayList<>(col);
//        return reservations.stream()
//                .map(reservationMapper::toReserveDto)
//                .collect(Collectors.toList());
//    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/room_search/{room_name}")
    public List<ReservationDTO> getReservationsOfRoom(@PathVariable String room_name) {
        Room room = roomService.validateAndGetRoomWithName(room_name);
        List<Reservation> reservations = reservationService.getReservationsOfRoom(room);
        return reservations.stream()
                .map(reservationMapper::toReserveDto)
                .collect(Collectors.toList());
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/searchID/{id}")
    public ReservationDTO getReservation(@PathVariable int id)
    {
        return reservationMapper.toReserveDto(reservationService.validateAndGetReservation(id));
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @DeleteMapping("/{id}")
    public ReservationDTO deleteReservation(@PathVariable int id) {
        Reservation reservation = reservationService.validateAndGetReservation(id);
        reservationService.deleteReservation(reservation);
        return reservationMapper.toReserveDto(reservation);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/myReservations")
    public List<ReservationDTO> getMyReservations(@AuthenticationPrincipal Data_UserDetails currentUser)
    {
        User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
        userService.validateClient(user);
        return reservationService.getReservationsOfClient(user).stream().map(reservationMapper::toReserveDto).collect(Collectors.toList());
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/client/{username}")
    public List<ReservationDTO> getReservationsOfClient(@PathVariable String username)
    {
        User user = userService.validateAndGetUserByUsername(username);
        userService.validateClient(user);
        return reservationService.getReservationsOfClient(user).stream().map(reservationMapper::toReserveDto).collect(Collectors.toList());
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/myReservations/{id}")
    public ReservationDTO getMyReservation(@AuthenticationPrincipal Data_UserDetails currentUser,
                                           @PathVariable int id)
    {
        User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
        userService.validateClient(user);
        Reservation reservation = reservationService.validateAndGetReservation(id);
        reservationService.validateClientReservationConnection(user, reservation);
        return reservationMapper.toReserveDto(reservation);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/client/{username}/reservation/{id}")
    public ReservationDTO getReservationOfClient(@PathVariable String username,
                                           @PathVariable int id)
    {
        User user = userService.validateAndGetUserByUsername(username);
        userService.validateClient(user);
        Reservation reservation = reservationService.validateAndGetReservation(id);
        reservationService.validateClientReservationConnection(user, reservation);
        return reservationMapper.toReserveDto(reservation);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/myRooms/{roomId}")
    public List<ReservationDTO> getReservationsOfMyRoom(@AuthenticationPrincipal Data_UserDetails currentUser,
                                                        @PathVariable int roomId)
    {
        requestService.validateLandlord(currentUser.getUsername());
        User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
        userService.validateLandlord(user);
        Room room = roomService.validateAndGetRoom(roomId);
        roomService.validateRoomLandlordConnection(user, room);
        return reservationService.getReservationsOfRoom(room).stream().map(reservationMapper::toReserveDto).collect(Collectors.toList());
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/rooms/{username}")
    public List<ReservationDTO> getReservationsOfLandlordRooms(@PathVariable String username)
    {
        User user = userService.validateAndGetUserByUsername(username);
        userService.validateLandlord(user);
        List<Room> rooms = roomService.getRoomsByLandlord(user);
        for(Room room: rooms)
            roomService.validateRoomLandlordConnection(user, room);
        return reservationService.getReservationsOfRooms(rooms).stream().map(reservationMapper::toReserveDto).collect(Collectors.toList());
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/myRooms/{roomId}/myReservations/{reservationId}")
    public ReservationDTO getReservationOfMyRoom(@AuthenticationPrincipal Data_UserDetails currentUser,
                                                        @PathVariable int roomId,
                                                       @PathVariable int reservationId)
    {
        requestService.validateLandlord(currentUser.getUsername());
        User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
        userService.validateLandlord(user);
        Room room = roomService.validateAndGetRoom(roomId);
        roomService.validateRoomLandlordConnection(user, room);
        Reservation reservation = reservationService.validateAndGetReservation(reservationId);
        reservationService.validateRoomReservationConnection(room, reservation);
        return reservationMapper.toReserveDto(reservation);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/rooms/{username}/reservations/{reservationId}")
    public ReservationDTO getReservationOfLandlordRoom(@PathVariable String username,
                                                 @PathVariable int reservationId)
    {
        User user = userService.validateAndGetUserByUsername(username);
        userService.validateLandlord(user);
        List<Room> rooms = roomService.getRoomsByLandlord(user);
        for(Room room: rooms)
            roomService.validateRoomLandlordConnection(user, room);
        List<Reservation> reservations = reservationService.getReservationsOfRooms(rooms);
        Reservation reservation = reservationService.validateAndGetReservation(reservationId);
        if(reservations.contains(reservation))
            return reservationMapper.toReserveDto(reservation);
        else
            throw new Exception_ReservationNotFound("Reservation with id" + reservationId + "is not found");
    }

}
