package com.travel_website.travel_website_2_backend.Service;

import com.travel_website.travel_website_2_backend.Exception.Exception_RatingDoesNotExist;
import com.travel_website.travel_website_2_backend.Exception.Exception_RoomNotFound;
import com.travel_website.travel_website_2_backend.Exception.Exception_SortingNotAllowed;
import com.travel_website.travel_website_2_backend.Models.Rating;
import com.travel_website.travel_website_2_backend.Repository.RatingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
import java.util.*;
import java.util.stream.IntStream;
import java.util.stream.Stream;

@RequiredArgsConstructor
@Service
public class RatingServiceImplementation implements RatingService{

    private final RatingRepository ratingRepository;


    @Override
    public List<Rating> allRatings()
    {
        return ratingRepository.findAll();
    }

    @Override
    public Rating validateAndGetRatingById(int id)
    {
        return ratingRepository.findById(id)
                .orElseThrow(() -> new Exception_RatingDoesNotExist("Rating with id " + id + " does not exist"));
    }

    @Override
    public Rating validateAndGetRatingByRoomAndUser(int room, int user)
    {
        return ratingRepository.findByRoomAndUser(room, user)
                .orElseThrow(() -> new Exception_RatingDoesNotExist("Rating of room " + room + " by user with id " + user + " does not exist"));
    }

    @Override
    public float getRatingOfRoom(int room)
    {
        List<Integer> list = new ArrayList<>();
        List<Rating> ratings = ratingRepository.findByRoom(room);
        int sum = 0;
        for(Rating rating : ratings)
        {
            list.add(rating.getRating());
            sum += rating.getRating();
        }
        float average = sum / list.size();
        return average;
    }

    @Override
    public List<Rating> getRatingsOfUser(int user)
    {
        return ratingRepository.findByUser(user);
    }


    @Override
    public List<Rating> getRatingsOfRoom(int room)
    {
        return ratingRepository.findByRoom(room);
    }

//    @Override
//    public List<Rating> getRatingsOfRoom(int room, String type)
//    {
//        List<Rating> ratings = ratingRepository.findByRoom(room);
//        if(type.equals("desc"))
//            Collections.sort(ratings, Collections.reverseOrder());
//        else if(type.equals("asc"))
//            Collections.sort(ratings, Rating::getRating);
//        else if(type.equals("time"))
//            Collections.sort(ratings, Collections.reverseOrder());
//        else
//            throw new Exception_SortingNotAllowed("Not allowed");
//    }

    @Override
    public List<Rating> getRatingsOfUserAbove(int user, int bottom)
    {
        return ratingRepository.findByUserAndRatingBetween(user, bottom, 6);
    }

    @Override
    public List<Rating> getRatingsOfUserBelow(int user, int top)
    {
        return ratingRepository.findByUserAndRatingBetween(user, 0, top);
    }

    @Override
    public Rating saveRating(Rating rating)
    {
        return ratingRepository.save(rating);
    }

    @Override
    public void deleteRating(Rating rating)
    {
        ratingRepository.delete(rating);
    }

}
