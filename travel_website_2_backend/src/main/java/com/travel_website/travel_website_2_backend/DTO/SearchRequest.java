package com.travel_website.travel_website_2_backend.DTO;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SearchRequest {

    @Schema(example = "-50.00")
    private double latitude;

    @Schema(example = "-50.00")
    private double longitude;

    @Schema(example = "10km", defaultValue = "50")
    private int range;

    @Schema(example = "19/12/23")
    private String start;

    @Schema(example = "31/12/23")
    private String end;

    @Schema(example = "private_room")
    @NotBlank
    private String typeofroom;

    @Schema(example = "1")
    private int numOfBeds;

    @Schema(example = "1")
    private int numOfBaths;

    @Schema(example = "1")
    private int numOfBedrooms;

    @Schema(example = "true")
    private boolean livingRoom;

    @Schema(example = "100")
    private int area;

    @Schema(example = "A very nice house")
    private String description;

    @Schema(example = "true")
    private boolean smoking;

    @Schema(example = "true")
    private boolean pets;

    @Schema(example = "true")
    private boolean events;

    @Schema(example = "2")
    private int minimumDays;

    @Schema(example = "true")
    private boolean internet;

    @Schema(example = "true")
    private boolean cooling;

    @Schema(example = "true")
    private boolean heating;

    @Schema(example = "true")
    private boolean kitchen;

    @Schema(example = "true")
    private boolean tv;

    @Schema(example = "true")
    private boolean parking;

    @Schema(example = "true")
    private boolean elevator;

    @Schema(example = "1", defaultValue = "1")
    private int first_element;

    @Schema(example = "1", defaultValue = "1")
    private int last_element;

}
