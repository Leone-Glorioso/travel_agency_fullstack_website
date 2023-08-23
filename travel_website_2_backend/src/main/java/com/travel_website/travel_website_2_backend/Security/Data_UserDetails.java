package com.travel_website.travel_website_2_backend.Security;

import com.travel_website.travel_website_2_backend.Models.UserCategories;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@Data
public class Data_UserDetails implements UserDetails {
    private int id;
    private String name;
    private String surname;
    private String email;
    private long telephone;
    private String photo;
    private String country;
    private UserCategories role;
    private String username;
    private String password;
    private Collection<? extends GrantedAuthority> authorities;

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
