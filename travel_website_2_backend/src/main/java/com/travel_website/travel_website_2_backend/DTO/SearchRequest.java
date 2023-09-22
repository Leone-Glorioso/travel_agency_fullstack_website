package com.travel_website.travel_website_2_backend.DTO;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class SearchRequest {

    private boolean cooling;
    private boolean elevator;
    private String end;
    private int end_area;
    private int end_numOfBaths;
    private int end_numOfBedrooms;
    private int end_numOfBeds;
    private boolean events;
    private int first_element;
    private String flags;
    private boolean heating;
    private boolean internet;
    private boolean kitchen;
    private int last_element;
    private double latitude;
    private boolean livingRoom;
    private double longitude;
    private boolean parking;
    private boolean pets;
    private int range;
    private boolean smoking;
    private String start;
    private int start_area;
    private int start_numOfBaths;
    private int start_numOfBedrooms;
    private int start_numOfBeds;
    private boolean tv;
    private String typeofroom;



//    @Schema(name = "10latitude", example = "-50.00")
//    private double latitude;
//
//    @Schema(name = "11longitude", example = "-50.00")
//    private double longitude;
//
//    @Schema(name = "12range", example = "10km", defaultValue = "50")
//    private int range;
//
//    @Schema(name = "13start", example = "19/12/23")
//    private String start;
//
//    @Schema(name = "14end", example = "31/12/23")
//    private String end;
//
//    @Schema(name = "15typeofroom", example = "private_room")
//    @NotBlank
//    private String typeofroom;
//
//    @Schema(name = "16start_numOfBeds", example = "1", defaultValue = "1")
//    private int start_numOfBeds;
//
//    @Schema(name = "17end_numOfBeds", example = "1", defaultValue = "10")
//    private int end_numOfBeds;
//
//    @Schema(name = "18start_numOfBaths", example = "1", defaultValue = "1")
//    private int start_numOfBaths;
//
//    @Schema(name = "19end_numOfBaths", example = "1", defaultValue = "10")
//    private int end_numOfBaths;
//
//    @Schema(name = "20start_numOfBedrooms", example = "1", defaultValue = "1")
//    private int start_numOfBedrooms;
//
//    @Schema(name = "21end_numOfBedrooms", example = "1", defaultValue = "10")
//    private int end_numOfBedrooms;
//
//    @Schema(name = "22livingRoom", example = "true")
//    private boolean livingRoom;
//
//    @Schema(name = "23start_area", example = "100", defaultValue = "1")
//    private int start_area;
//
//    @Schema(name = "24end_area", example = "100", defaultValue = "1000")
//    private int end_area;
//
//    @Schema(name = "25smoking", example = "true")
//    private boolean smoking;
//
//    @Schema(name = "26pets", example = "true")
//    private boolean pets;
//
//    @Schema(name = "27events", example = "true")
//    private boolean events;
//
//    @Schema(name = "28internet", example = "true")
//    private boolean internet;
//
//    @Schema(name = "29cooling", example = "true")
//    private boolean cooling;
//
//    @Schema(name = "30heating", example = "true")
//    private boolean heating;
//
//    @Schema(name = "31kitchen", example = "true")
//    private boolean kitchen;
//
//    @Schema(name = "32tv", example = "true")
//    private boolean tv;
//
//    @Schema(name = "33parking", example = "true")
//    private boolean parking;
//
//    @Schema(name = "34elevator", example = "true")
//    private boolean elevator;
//
//    @Schema(name = "35first_element", example = "1")//, defaultValue = "1")
//    private int first_element;
//
//    @Schema(name = "36last_element", example = "1")//, defaultValue = "1")
//    private int last_element;
//
//    @Schema(name = "37flags", example = "beds", defaultValue = "1")
//    private String flags;
    // String: parking, tv
}
