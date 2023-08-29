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

    @Schema(example = "1", defaultValue = "1")
    private int start_numOfBeds;

    @Schema(example = "1", defaultValue = "10")
    private int end_numOfBeds;

    @Schema(example = "1", defaultValue = "1")
    private int start_numOfBaths;

    @Schema(example = "1", defaultValue = "10")
    private int end_numOfBaths;

    @Schema(example = "1", defaultValue = "1")
    private int start_numOfBedrooms;

    @Schema(example = "1", defaultValue = "10")
    private int end_numOfBedrooms;

    @Schema(example = "true")
    private boolean livingRoom;

    @Schema(example = "100", defaultValue = "1")
    private int start_area;

    @Schema(example = "100", defaultValue = "1000")
    private int end_area;

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
