package com.travel_website.travel_website_2_backend.Mapper;

import com.travel_website.travel_website_2_backend.DTO.CreateRating;
import com.travel_website.travel_website_2_backend.DTO.RatingDTO;
import com.travel_website.travel_website_2_backend.Models.Rating;

public interface RatingMapper {

    Rating createRating(CreateRating rating, int user, int room);

    RatingDTO toRatingDto(Rating rating);

}
