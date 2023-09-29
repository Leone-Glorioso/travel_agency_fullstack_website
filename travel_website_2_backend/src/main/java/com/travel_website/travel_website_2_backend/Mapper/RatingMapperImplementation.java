package com.travel_website.travel_website_2_backend.Mapper;

import com.travel_website.travel_website_2_backend.DTO.CreateRating;
import com.travel_website.travel_website_2_backend.DTO.RatingDTO;
import com.travel_website.travel_website_2_backend.Models.Rating;
import org.springframework.stereotype.Service;

@Service
public class RatingMapperImplementation implements RatingMapper{

    @Override
    public Rating createRating(CreateRating rating, String user, String room)
    {
        if(rating == null)
            return null;
        return new Rating(rating.getRating(), rating.getDescription(), user, room);
    }

    @Override
    public RatingDTO toRatingDto(Rating rating)
    {
        if(rating == null)
            return null;
        return new RatingDTO(rating.getId(), rating.getRating(), rating.getDescription(), rating.getUser(), rating.getRoom());
    }
}
