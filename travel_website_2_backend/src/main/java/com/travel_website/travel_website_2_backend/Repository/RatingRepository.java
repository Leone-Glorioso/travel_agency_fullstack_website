package com.travel_website.travel_website_2_backend.Repository;

import com.travel_website.travel_website_2_backend.DTO.RatingDTO;
import com.travel_website.travel_website_2_backend.Models.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.relational.core.sql.In;

import java.util.List;
import java.util.Optional;

public interface RatingRepository extends JpaRepository<Rating, Integer> {

    Optional<Rating> findById(int id);

    List<Rating> findByRoom(int room);

    List<Rating> findByUser(int user);

    Optional<Rating> findByRoomAndUser(int room, int user);

    List<Rating> findByRatingBetween(int start, int end);

    List<Rating> findByUserAndRatingBetween(int user, int start_rating, int end_rating);

}
