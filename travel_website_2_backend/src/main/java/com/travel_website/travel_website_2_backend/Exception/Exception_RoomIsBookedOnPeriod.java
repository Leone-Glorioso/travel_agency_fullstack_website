package com.travel_website.travel_website_2_backend.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.EXPECTATION_FAILED)
public class Exception_RoomIsBookedOnPeriod extends RuntimeException{
    public Exception_RoomIsBookedOnPeriod(String message) {
        super(message);
    }
}
