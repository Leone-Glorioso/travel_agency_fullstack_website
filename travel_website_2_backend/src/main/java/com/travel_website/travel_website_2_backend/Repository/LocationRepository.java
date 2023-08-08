package com.travel_website.travel_website_2_backend.Repository;

import com.travel_website.travel_website_2_backend.Models.Address;
import com.travel_website.travel_website_2_backend.Models.Location;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LocationRepository extends JpaRepository<Location, Integer> {
    boolean existsById(int id);

    boolean existsByAddress(Address address);

    Optional<Location> findById(int id);

    Optional<Location> findByAddress(Address address);

    List<Location> findByNeighbourhood(String neighbourhood);
}
