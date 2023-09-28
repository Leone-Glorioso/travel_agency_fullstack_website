package com.travel_website.travel_website_2_backend.Service;

import com.travel_website.travel_website_2_backend.Models.Rating;

import java.util.List;

public interface RatingService {

    List<Rating> allRatings();

    Rating validateAndGetRatingById(int id);

    Rating validateAndGetRatingByRoomAndUser(int room, int user);

    float getRatingOfRoom(int room);

    List<Rating> getRatingsOfUser(int user);

    List<Rating> getRatingsOfRoom(int room);

//    List<Rating> getRatingsOfRoom(int room, String type);

    List<Rating> getRatingsOfUserAbove(int user, int bottom);


    List<Rating> getRatingsOfUserBelow(int user, int top);

    Rating saveRating(Rating rating);

    void deleteRating(Rating rating);
}
