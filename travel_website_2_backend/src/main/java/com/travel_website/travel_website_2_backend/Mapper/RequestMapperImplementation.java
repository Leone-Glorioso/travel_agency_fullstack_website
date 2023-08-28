package com.travel_website.travel_website_2_backend.Mapper;

import com.travel_website.travel_website_2_backend.DTO.NewLandlordRequest;
import com.travel_website.travel_website_2_backend.DTO.RequestDTO;
import com.travel_website.travel_website_2_backend.Models.Request;
import org.springframework.stereotype.Service;

@Service
public class RequestMapperImplementation implements RequestMapper{

    @Override
    public Request newRequest(NewLandlordRequest request)
    {
        if(request == null)
            return null;
        return new Request(request.getLandlord(), request.isVerified(), request.isPending());
    }


    @Override
    public RequestDTO toRequestDto(Request request)
    {
        if(request == null)
            return null;
        return new RequestDTO(request.getLandlord(), request.isVerified(), request.isPending());
    }
}
