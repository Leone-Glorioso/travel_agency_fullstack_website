package com.travel_website.travel_website_2_backend.RestControllers;


import com.travel_website.travel_website_2_backend.DTO.RequestDTO;
import com.travel_website.travel_website_2_backend.Mapper.RequestMapper;
import com.travel_website.travel_website_2_backend.Models.Request;
import com.travel_website.travel_website_2_backend.Service.RequestService;
import com.travel_website.travel_website_2_backend.Service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static com.travel_website.travel_website_2_backend.Configuration.Configuration_Swagger.BEARER_KEY_SECURITY_SCHEME;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/requests")
public class RequestController {

    private final RequestService requestService;
    private final RequestMapper requestMapper;
    private final UserService userService;

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/all")
    List<RequestDTO> allRequests()
    {
        return requestService.returnAllRequests().stream().map(requestMapper::toRequestDto).collect(Collectors.toList());
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/all/pending")
    List<RequestDTO> allPendingRequests()
    {
        return requestService.returnAllPendingRequests().stream().map(requestMapper::toRequestDto).collect(Collectors.toList());
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/all/accepted")
    List<RequestDTO> allAcceptedRequests()
    {
        return requestService.returnAllAcceptedRequests().stream().map(requestMapper::toRequestDto).collect(Collectors.toList());
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/all/rejected")
    List<RequestDTO> allRejectedRequests()
    {
        return requestService.returnAllRejectedRequests().stream().map(requestMapper::toRequestDto).collect(Collectors.toList());
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @PatchMapping("/accept/{landlord_username}")
    RequestDTO acceptRequest(@PathVariable String landlord_username)
    {
        requestService.validatePending(landlord_username);
        Request request = requestService.saveRequest(new Request(landlord_username, true, false));
        return requestMapper.toRequestDto(request);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @PatchMapping("/reject/{landlord_username}")
    RequestDTO rejectRequest(@PathVariable String landlord_username)
    {
        requestService.validatePending(landlord_username);
        Request request = requestService.saveRequest(new Request(landlord_username, false, false));
        userService.deleteUser(userService.validateAndGetUserByUsername(landlord_username));
        return requestMapper.toRequestDto(request);
    }
}
