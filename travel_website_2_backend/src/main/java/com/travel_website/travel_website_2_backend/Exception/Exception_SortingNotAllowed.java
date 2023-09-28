package com.travel_website.travel_website_2_backend.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class Exception_SortingNotAllowed extends RuntimeException{
    public Exception_SortingNotAllowed(String message) {
        super(message);
    }
}
