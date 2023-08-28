package com.travel_website.travel_website_2_backend.DTO;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class NewLandlordRequest {

    @Schema(example = "1")
    @NotBlank
    private String landlord;

    @Schema(example = "true")
    @NotBlank
    private boolean verified;

    @Schema(example = "true")
    @NotBlank
    private boolean pending;
}
