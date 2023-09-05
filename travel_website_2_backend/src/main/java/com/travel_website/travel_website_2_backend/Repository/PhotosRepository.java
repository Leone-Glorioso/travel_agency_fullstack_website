package com.travel_website.travel_website_2_backend.Repository;

import com.travel_website.travel_website_2_backend.Models.Photos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PhotosRepository extends JpaRepository<Photos, Integer> {
    Optional<Photos> findById(int id);

    Optional<Photos> findByName(String name);

    boolean existsByName(String name);

//    Photos findByPath(String path);

//    boolean existsByPath(String path);
}
