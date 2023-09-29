package com.travel_website.travel_website_2_backend.RestControllers;


import com.travel_website.travel_website_2_backend.DTO.CreateRating;
import com.travel_website.travel_website_2_backend.DTO.RatingDTO;
import com.travel_website.travel_website_2_backend.Mapper.RatingMapper;
import com.travel_website.travel_website_2_backend.Security.Data_UserDetails;
import com.travel_website.travel_website_2_backend.Service.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

import static com.travel_website.travel_website_2_backend.Configuration.Configuration_Swagger.BEARER_KEY_SECURITY_SCHEME;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/ratings")
public class RatingController {

    private final RatingMapper ratingMapper;
    private final RatingService ratingService;
    private final ReservationService reservationService;
    private final RoomService roomService;
    private final UserService userService;

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/all")
    public List<RatingDTO> allRatings()
    {
        return ratingService.allRatings().stream().map(ratingMapper::toRatingDto).collect(Collectors.toList());
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/get/{id}")
    public RatingDTO getRating(@PathVariable int id)
    {
        return ratingMapper.toRatingDto(ratingService.validateAndGetRatingById(id));
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/user/{username}")
    public List<RatingDTO> allRatingsByUser(@PathVariable String username)
    {
        return ratingService.getRatingsOfUser(username).stream().map(ratingMapper::toRatingDto).collect(Collectors.toList());
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/room/{room_name}")
    public List<RatingDTO> allRatingsOfRoom(@PathVariable String room_name)
    {
        return ratingService.getRatingsOfRoom(room_name).stream().map(ratingMapper::toRatingDto).collect(Collectors.toList());
    }


    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/room/{room_name}/rating")
    public float ratingOfRoom(@PathVariable String room_name)
    {
        return ratingService.getRatingOfRoom(room_name);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @PostMapping("/{room_name}")
    public RatingDTO rate(@Valid @RequestBody CreateRating createRating, @AuthenticationPrincipal Data_UserDetails currentUser, @PathVariable String room_name)
    {
        userService.validateClient(userService.validateAndGetUserByUsername(currentUser.getUsername()));
        reservationService.validateClientHasReservedRoom(userService.validateAndGetUserByUsername(currentUser.getUsername()), roomService.validateAndGetRoomWithName(room_name));
        return ratingMapper.toRatingDto(ratingService.saveRating(ratingMapper.createRating(createRating, currentUser.getUsername(), room_name)));
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @DeleteMapping("/{id}")
    public void DeleteRating(@PathVariable int id)
    {
        ratingService.deleteRating(ratingService.validateAndGetRatingById(id));
    }

}
