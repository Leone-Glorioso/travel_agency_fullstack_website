package com.travel_website.travel_website_2_backend.Service;

import com.travel_website.travel_website_2_backend.Mapper.MessageMapper;
import com.travel_website.travel_website_2_backend.Models.Message;

import java.util.List;

public interface MessageService {
    Message validateAndGetMessage(int id);

    List<Message> getMessagesByReceiver(String receiver);

    List<Message> getMessagesBySender(String sender);

    List<Message> getAll();

    Message saveMessage(Message message);

    void deleteMessage(Message message);
}
