package com.travel_website.travel_website_2_backend.RestControllers;

import com.travel_website.travel_website_2_backend.DTO.AuthenticationResponse;
import com.travel_website.travel_website_2_backend.Exception.Exception_PhotoNotProperlyGiven;
import com.travel_website.travel_website_2_backend.Exception.Exception_RoleDoesNotExist;
import com.travel_website.travel_website_2_backend.Models.Photos;
import com.travel_website.travel_website_2_backend.Models.Request;
import com.travel_website.travel_website_2_backend.Models.User;
import com.travel_website.travel_website_2_backend.DTO.LoginRequest;
import com.travel_website.travel_website_2_backend.DTO.SignUpRequest;
import com.travel_website.travel_website_2_backend.Exception.Exception_DuplicatedUserInfo;
import com.travel_website.travel_website_2_backend.Models.UserCategories;
import com.travel_website.travel_website_2_backend.Security.Component_TokenProvider;
import com.travel_website.travel_website_2_backend.Security.Configuration_WebSecurity;
import com.travel_website.travel_website_2_backend.Service.PhotosService;
import com.travel_website.travel_website_2_backend.Service.RequestService;
import com.travel_website.travel_website_2_backend.Service.UserService;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FilenameUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final Component_TokenProvider tokenProvider;
    private final RequestService requestService;
    private final PhotosService photosService;
    private static String imageDirectory = System.getProperty("user.dir") + "/images/";

    @PostMapping("/authenticate")
    public AuthenticationResponse login(@Valid @RequestBody LoginRequest loginRequest) {
        String token = authenticateAndGetToken(loginRequest.getUsername(), loginRequest.getPassword());
        return new AuthenticationResponse(token);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/signup")
    public AuthenticationResponse signUp(@Valid @RequestBody SignUpRequest signUpRequest,
                                         @RequestParam("imageFile") MultipartFile file,
                                         @RequestParam("imageName") String name) {
        if (userService.hasUserWithUsername(signUpRequest.getUsername())) {
            throw new Exception_DuplicatedUserInfo(String.format("Username %s already been used", signUpRequest.getUsername()));
        }
        if (userService.hasUserWithEmail(signUpRequest.getEmail())) {
            throw new Exception_DuplicatedUserInfo(String.format("Email %s already been used", signUpRequest.getEmail()));
        }

        User user = mapSignUpRequestToUser(signUpRequest);
        User newUser = saveImageOfUser(user, file, name);
        userService.saveUser(newUser);
        if(signUpRequest.getRole().equals("Landlord") || signUpRequest.getRole().equals("Landlord/Client"))
            requestService.saveRequest(new Request(signUpRequest.getUsername(), false, true));
        String token = authenticateAndGetToken(signUpRequest.getUsername(), signUpRequest.getPassword());
        return new AuthenticationResponse(token);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/signup2")
    public AuthenticationResponse signUp2(@Valid @RequestBody SignUpRequest signUpRequest) {
        if (userService.hasUserWithUsername(signUpRequest.getUsername())) {
            throw new Exception_DuplicatedUserInfo(String.format("Username %s already been used", signUpRequest.getUsername()));
        }
        if (userService.hasUserWithEmail(signUpRequest.getEmail())) {
            throw new Exception_DuplicatedUserInfo(String.format("Email %s already been used", signUpRequest.getEmail()));
        }

        userService.saveUser(mapSignUpRequestToUser(signUpRequest));
        if(signUpRequest.getRole().equals("Landlord") || signUpRequest.getRole().equals("Landlord/Client"))
            requestService.saveRequest(new Request(signUpRequest.getUsername(), false, true));
        String token = authenticateAndGetToken(signUpRequest.getUsername(), signUpRequest.getPassword());
        return new AuthenticationResponse(token);
    }

    private String authenticateAndGetToken(String username, String password) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        return tokenProvider.generate(authentication);
    }

    private User mapSignUpRequestToUser(SignUpRequest signUpRequest) {
        User user = new User();
        user.setUsername(signUpRequest.getUsername());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setName(signUpRequest.getName());
        user.setSurname(signUpRequest.getSurname());
        user.setEmail(signUpRequest.getEmail());
        user.setTelephone(signUpRequest.getTelephone());
        user.setCountry(signUpRequest.getCountry());
//        user.setPhoto(signUpRequest.getPhoto());
        String role = signUpRequest.getRole();
        if(role.equals("Landlord"))
            user.setRole(Configuration_WebSecurity.LANDLORD);
        else if(role.equals("Client"))
            user.setRole(Configuration_WebSecurity.CLIENT);
        else if(role.equals("Landlord/Client"))
            user.setRole(Configuration_WebSecurity.LANDLORDCLIENT);
        else
            throw new Exception_RoleDoesNotExist("Role " + role + " does not exist");
        return user;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/init")
    public AuthenticationResponse createAdmin() {
        User user = new User();
        user.setUsername("admin");
        user.setPassword(passwordEncoder.encode("admin1234"));
        user.setName("admin");
        user.setSurname("admin");
        user.setEmail("admin@mail.com");
        user.setTelephone(1234567890);
        user.setCountry("Greece");
//        user.setPhoto("adminpath");
        user.setRole(Configuration_WebSecurity.ADMIN);
        userService.saveUser(user);

        String token = authenticateAndGetToken("admin", "admin1234");
        return new AuthenticationResponse(token);
    }


    private User saveImageOfUser(User user, MultipartFile file, String name)
    {
        makeDirectoryIfNotExist(imageDirectory);
        Path fileNamePath = Paths.get(imageDirectory,
                name.concat(".").concat(FilenameUtils.getExtension(file.getOriginalFilename())));
        try {
            Files.write(fileNamePath, file.getBytes());
            Photos photo = new Photos(name, user);
            photosService.savePhoto(photo);
            user.setUserPhoto(photo);
            return user;
        } catch (IOException ex) {
            throw new Exception_PhotoNotProperlyGiven("Photo throws error");
        }
    }


    private void makeDirectoryIfNotExist(String imageDirectory) {
        File directory = new File(imageDirectory);
        if (!directory.exists()) {
            directory.mkdir();
        }
    }
}
