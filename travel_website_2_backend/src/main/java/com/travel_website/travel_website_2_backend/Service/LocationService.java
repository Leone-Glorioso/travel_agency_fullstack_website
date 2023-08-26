package com.travel_website.travel_website_2_backend.Service;

import com.travel_website.travel_website_2_backend.Models.Location;

import java.util.List;

public interface LocationService {

    List<Location> getLocations();

    Location saveLocation(Location location);

    Location validateAndGetLocation(int id);

    Location validateAndGetLocationFromPosition(double latitude, double longitude);

    void deleteLocation(Location location);
}
