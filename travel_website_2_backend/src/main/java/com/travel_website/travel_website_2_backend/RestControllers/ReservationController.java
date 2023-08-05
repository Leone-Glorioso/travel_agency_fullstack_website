package com.travel_website.travel_website_2_backend.RestControllers;

import com.travel_website.travel_website_2_backend.DTO.CreateReservationRequest;
import com.travel_website.travel_website_2_backend.DTO.ReservationDTO;
import com.travel_website.travel_website_2_backend.Mapper.ReservationMapper;
import com.travel_website.travel_website_2_backend.Models.Reservation;
import com.travel_website.travel_website_2_backend.Models.Room;
import com.travel_website.travel_website_2_backend.Models.User;
import com.travel_website.travel_website_2_backend.Security.Data_UserDetails;
import com.travel_website.travel_website_2_backend.Service.ReservationService;
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
import java.util.stream.Collectors;

import static com.travel_website.travel_website_2_backend.Configuration.Configuration_Swagger.BEARER_KEY_SECURITY_SCHEME;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final UserService userService;
    private final ReservationService reservationService;
    private final ReservationMapper reservationMapper;

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping
    public List<ReservationDTO> getReservations(@RequestParam(value = "int", required = false) int id, @RequestParam(required = false) User client, @RequestParam(required = false) Room room) {
        Collection<Reservation> col = new ArrayList<>(reservationService.getReservations());
        if(client != null) {
             col.retainAll(reservationService.getReservationsOfClient(client));
        }
        if (room != null) {
            col.retainAll(reservationService.getReservationsOfRoom(room));
        }
        List<Reservation> reservations = new ArrayList<>(col);
        return reservations.stream()
                .map(reservationMapper::toReserveDto)
                .collect(Collectors.toList());
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ReservationDTO createReservation(@AuthenticationPrincipal Data_UserDetails currentUser,
                                      @Valid @RequestBody CreateReservationRequest createOrderRequest) {
        User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
        Reservation reservation = reservationMapper.toReserve(createOrderRequest);
        reservation.setClient(user);
        return reservationMapper.toReserveDto(reservationService.saveReservation(reservation));
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @DeleteMapping("/{id}")
    public ReservationDTO deleteReservation(@PathVariable int id) {
        Reservation reservation = reservationService.validateAndGetReservation(id);
        reservationService.deleteReservation(reservation);
        return reservationMapper.toReserveDto(reservation);
    }
}
