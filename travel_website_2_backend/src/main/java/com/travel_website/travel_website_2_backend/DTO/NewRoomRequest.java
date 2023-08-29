package com.travel_website.travel_website_2_backend.DTO;

import com.travel_website.travel_website_2_backend.Models.Location;
import com.travel_website.travel_website_2_backend.Models.TypeOfRoom;
import com.travel_website.travel_website_2_backend.Models.User;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class NewRoomRequest {

    @Schema(example = "private_room")
    @NotBlank
    private String name;

    @Schema(example = "private_room")
    @NotBlank
    private String typeofroom;

    @Schema(example = "1")
    @NotBlank
    private int numOfBeds;

    @Schema(example = "1")
    @NotBlank
    private int numOfBaths;

    @Schema(example = "1")
    @NotBlank
    private int numOfBedrooms;

    @Schema(example = "true")
    @NotBlank
    private boolean livingRoom;

    @Schema(example = "100")
    @NotBlank
    private int area;

    @Schema(example = "A very nice house")
    @NotBlank
    private String description;

    //Rules
    @Schema(example = "true")
    @NotBlank
    private boolean smoking;

    @Schema(example = "true")
    @NotBlank
    private boolean pets;

    @Schema(example = "true")
    @NotBlank
    private boolean events;

    @Schema(example = "2")
    @NotBlank
    private int minimumDays;

//    @Schema(example = "-50.00")
//    @NotBlank
//    private double latitude;
//
//    @Schema(example = "+50.00")
//    @NotBlank
//    private double longitude;
//
//    @Schema(example = "Long beach 80, Birmingham, England")
//    private String address;

    @Schema(example = "true")
    @NotBlank
    private boolean internet;

    @Schema(example = "true")
    @NotBlank
    private boolean cooling;

    @Schema(example = "true")
    @NotBlank
    private boolean heating;

    @Schema(example = "true")
    @NotBlank
    private boolean kitchen;

    @Schema(example = "true")
    @NotBlank
    private boolean tv;

    @Schema(example = "true")
    @NotBlank
    private boolean parking;

    @Schema(example = "true")
    @NotBlank
    private boolean elevator;

}
