package com.travel_website.travel_website_2_backend.Repository;

import com.travel_website.travel_website_2_backend.Models.ImageData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StorageRepository extends JpaRepository<ImageData, Long> {

    Optional<ImageData> findByName(String fileName);
}
