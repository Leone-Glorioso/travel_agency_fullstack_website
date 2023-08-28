package com.travel_website.travel_website_2_backend.Repository;

import com.travel_website.travel_website_2_backend.Models.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//import java.util.List;
import java.util.List;
import java.util.Optional;

@Repository
public interface LocationRepository extends JpaRepository<Location, Integer> {
    boolean existsById(int id);

    boolean existsByLatitudeAndLongitude(double latitude, double longitude);

    Optional<Location> findById(int id);

    Optional<Location> findByLatitudeAndLongitude(double latitude, double longitude);
}
