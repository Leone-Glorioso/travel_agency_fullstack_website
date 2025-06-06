package com.travel_website.travel_website_2_backend.Service;

import com.travel_website.travel_website_2_backend.Exception.Exception_LocationNotFound;
import com.travel_website.travel_website_2_backend.Models.Location;
import com.travel_website.travel_website_2_backend.Repository.LocationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class LocationServiceImplementation implements LocationService{

    private final LocationRepository locationRepository;

    @Override
    public List<Location> getLocations()
    {
        return locationRepository.findAll(Sort.by(Sort.Direction.DESC));
    }

    @Override
    public Location saveLocation(Location location)
    {
        return locationRepository.save(location);
    }

    @Override
    public Location validateAndGetLocation(int id)
    {
        return locationRepository.findById(id)
                .orElseThrow(() -> new Exception_LocationNotFound("Location not found"));
    }

    @Override
    public Location validateAndGetLocationFromPosition(double latitude, double longitude)
    {
        return locationRepository.findByLatitudeAndLongitude(latitude, longitude)
                .orElseThrow(() -> new Exception_LocationNotFound("Location not found"));
    }


    @Override
    public void deleteLocation(Location location)
    {
        locationRepository.delete(location);
    }


    @Override
    public List<Location> locationsInArea(double latitude, double longitude, double range)
    {
        double rangeToPosition = range/222; //(range/111)/2
        return locationRepository.findByLatitudeBetweenAndLongitudeBetween(latitude - rangeToPosition, latitude + rangeToPosition,
                                                                            longitude - rangeToPosition, longitude + rangeToPosition);
    }
}
