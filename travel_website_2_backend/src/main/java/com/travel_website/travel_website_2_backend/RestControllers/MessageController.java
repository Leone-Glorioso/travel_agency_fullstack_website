package com.travel_website.travel_website_2_backend.RestControllers;

import com.travel_website.travel_website_2_backend.DTO.CreateMessage;
import com.travel_website.travel_website_2_backend.DTO.CreateRating;
import com.travel_website.travel_website_2_backend.DTO.MessageDTO;
import com.travel_website.travel_website_2_backend.DTO.RatingDTO;
import com.travel_website.travel_website_2_backend.Mapper.MessageMapper;
import com.travel_website.travel_website_2_backend.Models.Message;
import com.travel_website.travel_website_2_backend.Security.Data_UserDetails;
import com.travel_website.travel_website_2_backend.Service.MessageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

import static com.travel_website.travel_website_2_backend.Configuration.Configuration_Swagger.BEARER_KEY_SECURITY_SCHEME;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageService messageService;
    private final MessageMapper messageMapper;

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/all")
    public List<MessageDTO> allMessages()
    {
        return messageService.getAll().stream().map(messageMapper::toMessageDto).collect(Collectors.toList());
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/get/{id}")
    public MessageDTO getMessage(@PathVariable int id)
    {
        return messageMapper.toMessageDto(messageService.validateAndGetMessage(id));
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/sender/{username}")
    public List<MessageDTO> allMessagesBySender(@PathVariable String username)
    {
        return messageService.getMessagesBySender(username).stream().map(messageMapper::toMessageDto).collect(Collectors.toList());
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/receiver/{username}")
    public List<MessageDTO> allMessagesByReceiver(@PathVariable String username)
    {
        return messageService.getMessagesByReceiver(username).stream().map(messageMapper::toMessageDto).collect(Collectors.toList());
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @PostMapping
    public MessageDTO sendMessage(@Valid @RequestBody CreateMessage message, @AuthenticationPrincipal Data_UserDetails currentUser)
    {
        return messageMapper.toMessageDto(messageService.saveMessage(messageMapper.createMessage(message, currentUser.getUsername())));
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @DeleteMapping("/{id}")
    public void DeleteMessage(@PathVariable int id)
    {
        messageService.deleteMessage(messageService.validateAndGetMessage(id));
    }

}
