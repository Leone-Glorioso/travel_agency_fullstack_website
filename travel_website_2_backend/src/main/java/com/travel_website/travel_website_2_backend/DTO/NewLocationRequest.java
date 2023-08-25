package com.travel_website.travel_website_2_backend.DTO;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class NewLocationRequest {

    @Schema(example = "-50.00")
    @NotBlank
    private double latitude;

    @Schema(example = "-50.00")
    @NotBlank
    private double longitude;

    @Schema(example = "adams 8, long beach, california")
    private String address;
}
