package com.travel_website.travel_website_2_backend.Service;

import com.travel_website.travel_website_2_backend.Exception.Exception_MessageNotFound;
import com.travel_website.travel_website_2_backend.Models.Message;
import com.travel_website.travel_website_2_backend.Repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class MessageServiceImplementation implements MessageService{

    private final MessageRepository messageRepository;

    @Override
    public Message validateAndGetMessage(int id)
    {
        return messageRepository.findById(id)
                .orElseThrow(() -> new Exception_MessageNotFound("Message with id " + id + " does not exist"));
    }

    @Override
    public List<Message> getMessagesByReceiver(String receiver)
    {
        return messageRepository.findByReceiver(receiver);
    }

    @Override
    public List<Message> getMessagesBySender(String sender)
    {
        return messageRepository.findBySender(sender);
    }

    @Override
    public List<Message> getAll()
    {
        return messageRepository.findAll();
    }

    @Override
    public Message saveMessage(Message message)
    {
        return messageRepository.save(message);
    }

    @Override
    public void deleteMessage(Message message)
    {
        messageRepository.delete(message);
    }
}
