package com.travel_website.travel_website_2_backend.Service;

import com.travel_website.travel_website_2_backend.Models.User;
import com.travel_website.travel_website_2_backend.Models.UserCategories;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> getUsers();

    Optional<User> getUserByUsername(String username);

    boolean hasUserWithUsername(String username);

    boolean hasUserWithEmail(String email);

    User validateAndGetUserByUsername(String username);

    User saveUser(User user);

    void deleteUser(User user);

    void validateAdmin(User user);

    void validateLandlord(User user);

    void validateClient(User user);

    List<User> getUsersByRole(UserCategories role);
}
