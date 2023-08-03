package com.travel_website.travel_website_2_backend.Mapper;

import com.travel_website.travel_website_2_backend.DTO.LandlordDTO;
import com.travel_website.travel_website_2_backend.Models.User;

public interface LandlordMapper {
    LandlordDTO toLandlordDTO(User landlord);
}
