package com.travel_website.travel_website_2_backend.RestControllers;

import com.travel_website.travel_website_2_backend.Service.ReservationService;
import com.travel_website.travel_website_2_backend.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/public")
public class PublicController {

    private final UserService userService;
    private final ReservationService reservationService;

    @GetMapping("/numberOfUsers")
    public Integer getNumberOfUsers() {
        return userService.getUsers().size();
    }

    @GetMapping("/numberOfReservations")
    public Integer getNumberOfReservations() {
        return reservationService.getReservations().size();
    }
}
