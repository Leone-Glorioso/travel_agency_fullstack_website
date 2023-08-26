package com.travel_website.travel_website_2_backend.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class Exception_CalendarEntryDoesNotExist extends RuntimeException{
    public Exception_CalendarEntryDoesNotExist(String message) {
        super(message);
    }
}
