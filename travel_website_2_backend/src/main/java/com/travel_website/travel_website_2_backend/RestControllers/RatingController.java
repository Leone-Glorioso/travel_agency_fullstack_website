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
    @GetMapping("/user/{id}")
    public List<RatingDTO> allRatingsByUser(@PathVariable int id)
    {
        return ratingService.getRatingsOfUser(id).stream().map(ratingMapper::toRatingDto).collect(Collectors.toList());
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/room/{id}")
    public List<RatingDTO> allRatingsOfRoom(@PathVariable int id)
    {
        return ratingService.getRatingsOfRoom(id).stream().map(ratingMapper::toRatingDto).collect(Collectors.toList());
    }


    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/room/{id}/rating")
    public float ratingOfRoom(@PathVariable int id)
    {
        return ratingService.getRatingOfRoom(id);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @PostMapping("/{id}")
    public RatingDTO rate(@Valid @RequestBody CreateRating createRating, @AuthenticationPrincipal Data_UserDetails currentUser, @PathVariable int roomId)
    {
        userService.validateClient(userService.validateAndGetUserByUsername(currentUser.getUsername()));
        reservationService.validateClientHasReservedRoom(userService.validateAndGetUserByUsername(currentUser.getUsername()), roomService.validateAndGetRoom(roomId));
        return ratingMapper.toRatingDto(ratingService.saveRating(ratingMapper.createRating(createRating, currentUser.getId(), roomId)));
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @DeleteMapping("/{id}")
    public void DeleteRating(@PathVariable int id)
    {
        ratingService.deleteRating(ratingService.validateAndGetRatingById(id));
    }

}
