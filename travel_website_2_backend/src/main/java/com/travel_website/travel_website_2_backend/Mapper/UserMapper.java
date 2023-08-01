package com.travel_website.travel_website_2_backend.Mapper;

import com.travel_website.travel_website_2_backend.Models.User;

public interface UserMapper {
    UserDto toUserDto(User user);
}
