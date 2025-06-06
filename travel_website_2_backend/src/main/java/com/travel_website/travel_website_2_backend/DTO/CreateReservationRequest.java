package com.travel_website.travel_website_2_backend.DTO;

import com.travel_website.travel_website_2_backend.Models.Room;
import com.travel_website.travel_website_2_backend.Models.User;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;

@Data
public class CreateReservationRequest {

    @Schema(example = "31/12/23")
    @NotBlank
    private String end;

    @Schema(example = "50")
    @NotBlank
    private int ppn;

    @Schema(example = "19/12/23")
    @NotBlank
    private String start;

}
