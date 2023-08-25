package com.travel_website.travel_website_2_backend.Mapper;

import com.travel_website.travel_website_2_backend.DTO.LocationDTO;
import com.travel_website.travel_website_2_backend.DTO.NewLocationRequest;
import com.travel_website.travel_website_2_backend.Models.Location;
import org.springframework.stereotype.Service;

@Service
public class LocationMapperImplementation implements LocationMapper{

    @Override
    public Location toLocation(NewLocationRequest locationRequest)
    {
        if(locationRequest == null)
            return null;
        return new Location(locationRequest.getLatitude(), locationRequest.getLongitude(), locationRequest.getAddress());
    }

    @Override
    public LocationDTO toLocationDto(Location location)
    {
        if(location == null)
            return null;
        return new LocationDTO(location.getId(), location.getLatitude(), location.getLongitude(), location.getAddress());
    }

}
