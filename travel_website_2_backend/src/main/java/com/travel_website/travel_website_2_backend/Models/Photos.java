package com.travel_website.travel_website_2_backend.Models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.util.Objects;

@Entity
@Table(name = "photos")
public class Photos {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


    @Column(name = "name")
    @NotBlank
    private String name;

    @Column(name = "path")
    @NotBlank
    private String path;


    @OneToOne
    private User user;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Photos(String name, User userPhoto) {
        this.name = name;
        this.user = userPhoto;
    }

    public Photos(String name) {
        this.name = name;
    }

    public Photos(String name, String path, User user) {
        this.name = name;
        this.path = path;
        this.user = user;
    }

    public Photos() {
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Photos photos = (Photos) o;
        return id == photos.id && Objects.equals(name, photos.name) && Objects.equals(path, photos.path) && Objects.equals(user, photos.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, path, user);
    }
}
