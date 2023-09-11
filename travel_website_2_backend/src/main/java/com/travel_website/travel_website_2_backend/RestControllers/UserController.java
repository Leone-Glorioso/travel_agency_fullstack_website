package com.travel_website.travel_website_2_backend.RestControllers;

import com.travel_website.travel_website_2_backend.DTO.UserDTO;
import com.travel_website.travel_website_2_backend.Exception.Exception_PhotoNotProperlyGiven;
import com.travel_website.travel_website_2_backend.Mapper.UserMapper;
import com.travel_website.travel_website_2_backend.Models.Photos;
import com.travel_website.travel_website_2_backend.Models.User;
import com.travel_website.travel_website_2_backend.Models.UserCategories;
import com.travel_website.travel_website_2_backend.Security.Data_UserDetails;
import com.travel_website.travel_website_2_backend.Service.PhotosService;
import com.travel_website.travel_website_2_backend.Service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.ws.rs.FormParam;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FilenameUtils;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

import static com.travel_website.travel_website_2_backend.Configuration.Configuration_Swagger.BEARER_KEY_SECURITY_SCHEME;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private final UserMapper userMapper;
    private final PhotosService photosService;
    private static String imageDirectory = System.getProperty("user.dir") + "/images/";
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/me")
    public UserDTO getCurrentUser(@AuthenticationPrincipal Data_UserDetails currentUser) {
        return userMapper.toUserDto(userService.validateAndGetUserByUsername(currentUser.getUsername()));
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping
    public List<UserDTO> getUsers() {
        return userService.getUsers().stream()
                .map(userMapper::toUserDto)
                .collect(Collectors.toList());
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/landlords")
    public List<UserDTO> getLandlords() {
        List<User> combined = userService.getUsersByRole(UserCategories.LandlordClient);
        combined.addAll(userService.getUsersByRole(UserCategories.Landlord));
        return combined.stream()
                .map(userMapper::toUserDto)
                .collect(Collectors.toList());
    }


    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/clients")
    public List<UserDTO> getClients() {
        List<User> combined = userService.getUsersByRole(UserCategories.LandlordClient);
        combined.addAll(userService.getUsersByRole(UserCategories.Client));
        return combined.stream()
                .map(userMapper::toUserDto)
                .collect(Collectors.toList());
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/landlordsclients")
    public List<UserDTO> getCombinedUsers() {
        return userService.getUsersByRole(UserCategories.LandlordClient).stream()
                .map(userMapper::toUserDto)
                .collect(Collectors.toList());
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/{username}")
    public UserDTO getUser(@PathVariable("username") String username) {
        return userMapper.toUserDto(userService.validateAndGetUserByUsername(username));
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @DeleteMapping("/{username}")
    public UserDTO deleteUser(@PathVariable("username") String username) {
        User user = userService.validateAndGetUserByUsername(username);
        userService.deleteUser(user);
        return userMapper.toUserDto(user);
    }


    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @PostMapping(path = "/image/{username}",  consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public UserDTO updateUserImage(@PathVariable("username") String username,
                                   @RequestParam("name") String name,
                                   @RequestPart("file") MultipartFile file)
    {
        User user = userService.validateAndGetUserByUsername(username);
        makeDirectoryIfNotExist(imageDirectory);
        Path fileNamePath = Paths.get(imageDirectory,
                name.concat(".").concat(FilenameUtils.getExtension(file.getOriginalFilename())));
        try {
            Files.write(fileNamePath, file.getBytes());
            user.setUserPhoto(photosService.savePhoto(new Photos(name, fileNamePath.toString(), user)));
            return userMapper.toUserDto(user);
        } catch (IOException ex) {
            throw new Exception_PhotoNotProperlyGiven("Re-Give photo");
        }
    }

    private void makeDirectoryIfNotExist(String imageDirectory) {
        File directory = new File(imageDirectory);
        if (!directory.exists()) {
            directory.mkdir();
        }
    }
}
