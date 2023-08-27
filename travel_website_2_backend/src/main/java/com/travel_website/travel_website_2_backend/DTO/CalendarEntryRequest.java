package com.travel_website.travel_website_2_backend.DTO;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CalendarEntryRequest {

    @Schema(example = "1")
    @NotBlank
    private int room;

    @Schema(example = "06/06/2023")
    @NotBlank
    private String date;
}
