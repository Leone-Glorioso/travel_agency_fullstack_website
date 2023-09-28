package com.travel_website.travel_website_2_backend.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.EXPECTATION_FAILED)
public class Exception_UserHasNotRatedRoom extends RuntimeException{
    public Exception_UserHasNotRatedRoom(String message) {
        super(message);
    }
}
