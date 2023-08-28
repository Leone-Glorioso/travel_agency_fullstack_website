package com.travel_website.travel_website_2_backend.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class Exception_LandlordNotVerifiedByAdmin extends RuntimeException{
    public Exception_LandlordNotVerifiedByAdmin(String message) {
        super(message);
    }
}
