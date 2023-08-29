package com.travel_website.travel_website_2_backend.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class Exception_RoomNameIsUsed extends RuntimeException{
    public Exception_RoomNameIsUsed(String message) {
        super(message);
    }
}
