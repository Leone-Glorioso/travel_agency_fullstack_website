package com.travel_website.travel_website_2_backend.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class Exception_LocationNotFound extends RuntimeException{
    public Exception_LocationNotFound(String message) {
        super(message);
    }
}
