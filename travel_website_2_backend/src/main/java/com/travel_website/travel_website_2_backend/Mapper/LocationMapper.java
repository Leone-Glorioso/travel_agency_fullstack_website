package com.travel_website.travel_website_2_backend.Mapper;

import com.travel_website.travel_website_2_backend.DTO.LocationDTO;
import com.travel_website.travel_website_2_backend.DTO.NewLocationRequest;
import com.travel_website.travel_website_2_backend.Models.Location;

public interface LocationMapper {

    Location toLocation(NewLocationRequest locationRequest);

    LocationDTO toLocationDto(Location location);

}
