package com.travel_website.travel_website_2_backend.Mapper;

import com.travel_website.travel_website_2_backend.DTO.NewLandlordRequest;
import com.travel_website.travel_website_2_backend.DTO.RequestDTO;
import com.travel_website.travel_website_2_backend.Models.Request;

public interface RequestMapper {

    Request newRequest(NewLandlordRequest request);

    RequestDTO toRequestDto(Request request);

}
