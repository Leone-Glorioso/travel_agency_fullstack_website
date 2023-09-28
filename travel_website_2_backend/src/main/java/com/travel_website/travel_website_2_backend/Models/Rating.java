package com.travel_website.travel_website_2_backend.Models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

import java.util.Objects;

@Entity
@Table(name = "ratings")
public class Rating {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "rating")
    @NotBlank
    @Max(5)
    @Min(1)
    private int rating;

    @Column(name = "description")
    @NotBlank
    private String description;

    @Column(name = "user")
    @NotBlank
    private int user;

    @Column(name = "room")
    @NotBlank
    private int room;

    public Rating(int rating, String description, int user, int room) {
        this.rating = rating;
        this.description = description;
        this.user = user;
        this.room = room;
    }

    public Rating() {

    }

    public void setId(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getUser() {
        return user;
    }

    public void setUser(int user) {
        this.user = user;
    }

    public int getRoom() {
        return room;
    }

    public void setRoom(int room) {
        this.room = room;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Rating rating1 = (Rating) o;
        return id == rating1.id && rating == rating1.rating && user == rating1.user && room == rating1.room && Objects.equals(description, rating1.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, rating, description, user, room);
    }
}
