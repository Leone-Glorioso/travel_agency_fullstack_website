package com.travel_website.travel_website_2_backend.Service;

import com.travel_website.travel_website_2_backend.Models.Rating;

import java.util.List;

public interface RatingService {

    List<Rating> allRatings();

    Rating validateAndGetRatingById(int id);

    Rating validateAndGetRatingByRoomAndUser(String room, String user);

    float getRatingOfRoom(String room);

    List<Rating> getRatingsOfUser(String user);

    List<Rating> getRatingsOfRoom(String room);

//    List<Rating> getRatingsOfRoom(int room, String type);

    List<Rating> getRatingsOfUserAbove(String user, int bottom);


    List<Rating> getRatingsOfUserBelow(String user, int top);

    Rating saveRating(Rating rating);

    void deleteRating(Rating rating);
}
