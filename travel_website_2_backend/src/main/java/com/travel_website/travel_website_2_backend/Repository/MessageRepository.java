package com.travel_website.travel_website_2_backend.Repository;

import com.travel_website.travel_website_2_backend.Models.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MessageRepository extends JpaRepository<Message, Integer> {

    Optional<Message> findById(int id);

    List<Message> findByReceiver(String receiver);

    List<Message> findBySender(String sender);

}
