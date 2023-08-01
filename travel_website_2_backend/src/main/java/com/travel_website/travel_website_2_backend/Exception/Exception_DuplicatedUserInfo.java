package com.travel_website.travel_website_2_backend.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class Exception_DuplicatedUserInfo extends RuntimeException{
    public Exception_DuplicatedUserInfo(String message)
    {
        super(message);
    }
}
