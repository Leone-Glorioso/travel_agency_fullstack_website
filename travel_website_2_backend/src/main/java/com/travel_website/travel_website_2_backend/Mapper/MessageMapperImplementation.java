package com.travel_website.travel_website_2_backend.Mapper;

import com.travel_website.travel_website_2_backend.DTO.CreateMessage;
import com.travel_website.travel_website_2_backend.DTO.MessageDTO;
import com.travel_website.travel_website_2_backend.DTO.RatingDTO;
import com.travel_website.travel_website_2_backend.Models.Message;
import org.springframework.stereotype.Service;

@Service
public class MessageMapperImplementation implements MessageMapper{
    @Override
    public Message createMessage(CreateMessage message, String sender)
    {
        if(message == null)
            return null;
        return new Message(message.getBody(), sender, message.getReceiver());
    }

    @Override
    public MessageDTO toMessageDto(Message message)
    {
        if(message == null)
            return null;
        return new MessageDTO(message.getId(), message.getBody(), message.getSender(), message.getReceiver());
    }
}
