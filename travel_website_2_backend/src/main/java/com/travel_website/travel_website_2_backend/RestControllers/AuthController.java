package com.travel_website.travel_website_2_backend.RestControllers;

import com.travel_website.travel_website_2_backend.DTO.AuthenticationResponse;
import com.travel_website.travel_website_2_backend.Models.User;
import com.travel_website.travel_website_2_backend.DTO.LoginRequest;
import com.travel_website.travel_website_2_backend.DTO.SignUpRequest;
import com.travel_website.travel_website_2_backend.Exception.Exception_DuplicatedUserInfo;
import com.travel_website.travel_website_2_backend.Security.Component_TokenProvider;
import com.travel_website.travel_website_2_backend.Security.Configuration_WebSecurity;
import com.travel_website.travel_website_2_backend.Service.UserService;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final Component_TokenProvider tokenProvider;

    @PostMapping("/authenticate")
    public AuthenticationResponse login(@Valid @RequestBody LoginRequest loginRequest) {
        String token = authenticateAndGetToken(loginRequest.getUsername(), loginRequest.getPassword());
        return new AuthenticationResponse(token);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/signup")
    public AuthenticationResponse signUp(@Valid @RequestBody SignUpRequest signUpRequest) {
        if (userService.hasUserWithUsername(signUpRequest.getUsername())) {
            throw new Exception_DuplicatedUserInfo(String.format("Username %s already been used", signUpRequest.getUsername()));
        }
        if (userService.hasUserWithEmail(signUpRequest.getEmail())) {
            throw new Exception_DuplicatedUserInfo(String.format("Email %s already been used", signUpRequest.getEmail()));
        }

        userService.saveUser(mapSignUpRequestToUser(signUpRequest));

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
        user.setPhoto(signUpRequest.getPhoto());
        String role = signUpRequest.getRole();
        if(role.equals("Admin"))
            user.setRole(Configuration_WebSecurity.ADMIN);
        else if(role.equals("Landlord"))
            user.setRole(Configuration_WebSecurity.LANDLORD);
        else
            user.setRole(Configuration_WebSecurity.CLIENT);
        return user;
    }
}
