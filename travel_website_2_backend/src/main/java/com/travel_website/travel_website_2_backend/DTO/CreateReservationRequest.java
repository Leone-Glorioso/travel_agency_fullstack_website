package com.travel_website.travel_website_2_backend.DTO;

import com.travel_website.travel_website_2_backend.Models.Room;
import com.travel_website.travel_website_2_backend.Models.User;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;

@Data
public class CreateReservationRequest {
    //TODO cannot contain class in request (User)
    @Schema(example = "user1")
    @NotBlank
    private User user;
    //TODO cannot contain class in request (Room)
    @Schema(example = "room18")
    @NotBlank
    private Room room;

    @Schema(example = "50")
    @NotBlank
    private int ppn;
    //TODO Configure local date
    @Schema(example = "19/12/23")
    @NotBlank
    private String start;

    @Schema(example = "31/12/23")
    @NotBlank
    private String end;
}
