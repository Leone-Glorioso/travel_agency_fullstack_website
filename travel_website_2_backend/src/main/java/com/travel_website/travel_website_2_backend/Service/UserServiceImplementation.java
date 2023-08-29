package com.travel_website.travel_website_2_backend.Service;

import com.travel_website.travel_website_2_backend.Exception.Exception_UserNotAdmin;
import com.travel_website.travel_website_2_backend.Exception.Exception_UserNotClient;
import com.travel_website.travel_website_2_backend.Exception.Exception_UserNotFound;
import com.travel_website.travel_website_2_backend.Exception.Exception_UserNotLandlord;
import com.travel_website.travel_website_2_backend.Models.User;
import com.travel_website.travel_website_2_backend.Models.UserCategories;
import com.travel_website.travel_website_2_backend.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserServiceImplementation implements UserService{
    private final UserRepository userRepository;

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public boolean hasUserWithUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public boolean hasUserWithEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public User validateAndGetUserByUsername(String username) {
        return getUserByUsername(username)
                .orElseThrow(() -> new Exception_UserNotFound(String.format("User with username %s not found", username)));
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(User user) {
        userRepository.delete(user);
    }

    @Override
    public void validateAdmin(User user)
    {
        if (!user.getRole().equals(UserCategories.Administrator))
            throw new Exception_UserNotAdmin("User is Not An Administrator");
    }

    @Override
    public void validateLandlord(User user)
    {
        if (!user.getRole().equals(UserCategories.Landlord) && !user.getRole().equals(UserCategories.LandlordClient))
            throw new Exception_UserNotLandlord("User is Not A Landlord");
    }

    @Override
    public void validateClient(User user)
    {
        if (!user.getRole().equals(UserCategories.Client) && !user.getRole().equals(UserCategories.LandlordClient))
            throw new Exception_UserNotClient("User is Not A Client");
    }


    @Override
    public List<User> getUsersByRole(UserCategories role)
    {
        return userRepository.findByRole(role);
    }
}
