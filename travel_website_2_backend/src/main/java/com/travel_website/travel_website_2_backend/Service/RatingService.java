package com.travel_website.travel_website_2_backend.Service;

import com.travel_website.travel_website_2_backend.Models.Rating;
import com.travel_website.travel_website_2_backend.Models.Room;

import java.util.List;

public interface RatingService {

    void validateAngGetRatingById(int id);

    void validateAndGetRatingByRoomAndUser(int room, int user);

    float getRatingOfRoom(int room);

//    List<Rating> getRatingsOfRoom(int room, String type);

    List<Rating> getRatingsOfUserAbove(int user, int bottom);


    List<Rating> getRatingsOfUserBelow(int user, int top);
}
