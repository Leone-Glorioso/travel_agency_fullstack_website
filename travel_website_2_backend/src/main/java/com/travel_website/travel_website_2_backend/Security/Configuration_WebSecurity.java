package com.travel_website.travel_website_2_backend.Security;


import org.springframework.http.HttpMethod;
import com.travel_website.travel_website_2_backend.Models.UserCategories;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class Configuration_WebSecurity {
    private final Component_Filter_TokenAuthentication tokenAuthenticationFilter;

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .authorizeHttpRequests(authorizeHttpRequests -> authorizeHttpRequests
                        .requestMatchers("api/users/me").hasAnyAuthority(ADMIN.toString(), LANDLORD.toString(), CLIENT.toString(), LANDLORDCLIENT.toString())
                        .requestMatchers("api/users", "api/users/**").hasAuthority(ADMIN.toString())
                        .requestMatchers("api/rooms/search/**", "api/rooms/location/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "api/rooms").hasAnyAuthority(LANDLORD.toString(), LANDLORDCLIENT.toString())
                        .requestMatchers(HttpMethod.GET, "api/rooms/me", "api/rooms/me/**").hasAnyAuthority(LANDLORD.toString(), LANDLORDCLIENT.toString())
                        .requestMatchers(HttpMethod.DELETE, "api/rooms").hasAuthority(ADMIN.toString())
                        .requestMatchers(HttpMethod.GET, "api/rooms/all", "api/rooms/landlord/**").hasAuthority(ADMIN.toString())
                        .requestMatchers(HttpMethod.GET, "api/reservations/myRooms/**").hasAnyAuthority(LANDLORD.toString(), LANDLORDCLIENT.toString())
                        .requestMatchers(HttpMethod.POST, "api/rooms/room/**").hasAnyAuthority(CLIENT.toString(), LANDLORDCLIENT.toString())
                        .requestMatchers(HttpMethod.GET, "api/reservations/myReservations", "api/reservations/myReservations/**").hasAnyAuthority(CLIENT.toString(), LANDLORDCLIENT.toString())
                        .requestMatchers(HttpMethod.DELETE, "api/reservations/**").hasAuthority(ADMIN.toString())
                        .requestMatchers(HttpMethod.GET, "api/reservations/all", "api/reservations/search", "api/reservations/searchID/**",
                                "api/reservations/client/**", "api/reservations/rooms/**").hasAuthority(ADMIN.toString())
                        .requestMatchers("api/locations", "api/locations/**").hasAnyAuthority(ADMIN.toString(), LANDLORD.toString(), CLIENT.toString(), LANDLORDCLIENT.toString())
                        .requestMatchers("api/requests/**").hasAuthority(ADMIN.toString())
                        .requestMatchers("/public/**", "/auth/**").permitAll()
                        .requestMatchers("/", "/error", "/csrf", "/swagger-ui.html", "/swagger-ui/**", "/v3/api-docs", "/v3/api-docs/**").permitAll()
                        .anyRequest().authenticated())
                .addFilterBefore(tokenAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling(exceptionHandling -> exceptionHandling.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
                .sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public static final UserCategories ADMIN = UserCategories.Administrator;
    public static final UserCategories LANDLORD = UserCategories.Landlord;
    public static final UserCategories CLIENT = UserCategories.Client;
    public static final UserCategories LANDLORDCLIENT = UserCategories.LandlordClient;
}