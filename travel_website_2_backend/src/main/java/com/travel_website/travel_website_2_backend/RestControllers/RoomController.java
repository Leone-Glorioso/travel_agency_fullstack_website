package com.travel_website.travel_website_2_backend.RestControllers;

import com.travel_website.travel_website_2_backend.DTO.NewRoomRequest;
import com.travel_website.travel_website_2_backend.DTO.RoomDTO;
import com.travel_website.travel_website_2_backend.Mapper.RoomMapper;
import com.travel_website.travel_website_2_backend.Models.Room;
import com.travel_website.travel_website_2_backend.Models.User;
import com.travel_website.travel_website_2_backend.Security.Data_UserDetails;
import com.travel_website.travel_website_2_backend.Service.RoomService;
import com.travel_website.travel_website_2_backend.Service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.travel_website.travel_website_2_backend.Configuration.Configuration_Swagger.BEARER_KEY_SECURITY_SCHEME;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/rooms")
public class RoomController {
    private final UserService userService;
    private final RoomService roomService;
    private final RoomMapper roomMapper;

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/all")
    public List<RoomDTO> getRooms()
    {
        return roomService.getRooms().stream()
                .map(roomMapper::toRoomDTO)
                .collect(Collectors.toList());
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @PostMapping
    public RoomDTO createRoom(@AuthenticationPrincipal Data_UserDetails currentUser,
                              @Valid @RequestBody NewRoomRequest newRoomRequest)
    {
        User landlord = userService.validateAndGetUserByUsername(currentUser.getUsername());
        Room room = roomMapper.newRoom(newRoomRequest);
        room.setLandlord(landlord);
        return roomMapper.toRoomDTO(room);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @DeleteMapping
    public RoomDTO deleteRoom(@PathVariable int id)
    {
        Room room = roomService.validateAndGetRoom(id);
        roomService.deleteRoom(room);
        return roomMapper.toRoomDTO(room);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/{id}")
    public RoomDTO getRoom(@PathVariable int id)
    {
        return roomMapper.toRoomDTO(roomService.validateAndGetRoom(id));
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/{username}/rooms")
    public List<RoomDTO> getRoomsByLandlord(@AuthenticationPrincipal Data_UserDetails currentUser)
    {
        User landlord = userService.validateAndGetUserByUsername(currentUser.getUsername());
        List<RoomDTO> list = new ArrayList<>();
        for (Room room:
             roomService.getRoomsByLandlord(landlord)) {
            list.add(roomMapper.toRoomDTO(room));
        }
        return list;
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/{username}/rooms/{id}")
    public RoomDTO getOneOfMyRooms(@AuthenticationPrincipal Data_UserDetails currentUser,
                                   @PathVariable int id)
    {
        RoomDTO roomDTO = roomMapper.toRoomDTO(roomService.validateAndGetRoom(id));
        if(roomService.validateAndGetRoom(id).getLandlord().equals(userService.validateAndGetUserByUsername(currentUser.getUsername())))
            return roomDTO;
        return null;
    }
}
