package com.travel_website.travel_website_2_backend.Mapper;

import com.travel_website.travel_website_2_backend.DTO.CreateMessage;
import com.travel_website.travel_website_2_backend.DTO.MessageDTO;
import com.travel_website.travel_website_2_backend.Models.Message;

public interface MessageMapper {
    Message createMessage(CreateMessage message, String sender);

    MessageDTO toMessageDto(Message message);
}
