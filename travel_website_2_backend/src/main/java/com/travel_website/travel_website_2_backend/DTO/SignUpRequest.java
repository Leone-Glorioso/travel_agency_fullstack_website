package com.travel_website.travel_website_2_backend.DTO;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SignUpRequest {
    @Schema(example = "user3")
    @NotBlank
    private String username;

    @Schema(example = "user3")
    @NotBlank
    private String password;

    @Schema(example = "User3")
    @NotBlank
    private String name;

    @Schema(example = "User3")
    @NotBlank
    private String surname;

    @Schema(example = "user3@email.com")
    @Email
    private String email;

    @Schema(example = "0030699999999")
    @NotBlank
    private long telephone;

    @Schema(example = "Greece")
    private String country;

    @Schema(example = "default")
    private String photo;

    @Schema(example = "Administrator")
    private String role;
}
