package com.travel_website.travel_website_2_backend.Mapper;

import com.travel_website.travel_website_2_backend.Models.User;
import com.travel_website.travel_website_2_backend.DTO.UserDTO;

public interface UserMapper {
    UserDTO toUserDto(User user);
}
