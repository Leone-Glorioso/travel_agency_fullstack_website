package com.travel_website.travel_website_2_backend.Initializer;

import com.travel_website.travel_website_2_backend.Models.User;
import com.travel_website.travel_website_2_backend.Models.UserCategories;
//import com.travel_website.travel_website_2_backend.Security.Configuration_WebSecurity;
import com.travel_website.travel_website_2_backend.Service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Component
public class DB implements CommandLineRunner {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (!userService.getUsers().isEmpty()) {
            return;
        }
        USERS.forEach(user -> {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userService.saveUser(user);
        });
        log.info("Database initialized");
    }

    private static final List<User> USERS = Arrays.asList(
            new User("admin", "admin", "admin@email.com", 3069999999L, "default", "Greece", UserCategories.Administrator, "Admin", "AdminAdmin"),
            new User("landlord", "landlord", "landlord@email.com", 3069999998L, "default", "Greece", UserCategories.Landlord, "Landlord", "LandlordLandlord"),
            new User("client", "client", "client@email.com", 3069999997L, "default", "Greece", UserCategories.Client, "Client", "ClientClient")
    );
}
