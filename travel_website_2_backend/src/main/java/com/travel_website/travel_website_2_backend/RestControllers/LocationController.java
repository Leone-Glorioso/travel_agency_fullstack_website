package com.travel_website.travel_website_2_backend.RestControllers;

import com.travel_website.travel_website_2_backend.DTO.LocationDTO;
import com.travel_website.travel_website_2_backend.DTO.NewLocationRequest;
import com.travel_website.travel_website_2_backend.Mapper.LocationMapper;
import com.travel_website.travel_website_2_backend.Models.Location;
import com.travel_website.travel_website_2_backend.Service.LocationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import static com.travel_website.travel_website_2_backend.Configuration.Configuration_Swagger.BEARER_KEY_SECURITY_SCHEME;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/locations")
public class LocationController {

    private final LocationService locationService;
    private final LocationMapper locationMapper;


    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @PostMapping
    public LocationDTO createLocation(@RequestBody NewLocationRequest locationRequest)
    {
        Location location = locationMapper.toLocation(locationRequest);
        locationService.saveLocation(location);
        return locationMapper.toLocationDto(location);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @DeleteMapping("/{id}")
    public LocationDTO deleteLocation(@PathVariable int id)
    {
        Location location = locationService.validateAndGetLocation(id);
        locationService.deleteLocation(location);
        return locationMapper.toLocationDto(location);
    }
}
