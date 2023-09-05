package com.travel_website.travel_website_2_backend.Models;

//import com.travel_website.travel_website_2_backend.Exception.EntityException;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import org.antlr.v4.runtime.misc.NotNull;

import java.io.Serializable;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "users")
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int Id;

    @Column(name = "name")
    @NotBlank
    private String name;

    @Column(name = "surname")
    @NotBlank
    private String surname;

    @Column(name = "email")
    @NotBlank
    private String email;

    @Column(name = "telephone", length = 14)
    @NotBlank
    private long telephone;

//    @Column(name = "photo")
//    @NotBlank
    //TODO Add default picture with "default <path to default picture>" after line below
//    private String photo;

    @Column(name = "country")
    private String country;

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private UserCategories role;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @OneToMany(mappedBy = "client")
    private Set<Reservation> reservationSet;

    @OneToMany(mappedBy = "landlord")
    private Set<Room> rooms;

    @OneToOne(mappedBy = "user")
    private Photos userPhoto;

//    public User(String name, String surname, String email, long telephone, String photo, String country, UserCategories role, String username, String password, Set<Reservation> reservationSet, Set<Room> rooms) {
//        this.name = name;
//        this.surname = surname;
//        this.email = email;
//        this.telephone = telephone;
//        this.photo = photo;
//        this.country = country;
//        this.role = role;
//        this.username = username;
//        this.password = password;
//        this.reservationSet = null;
//        this.rooms = null;
//        if(role == UserCategories.Client)
//            this.reservationSet = reservationSet;
//        else if(role == UserCategories.Landlord)
//            this.rooms = rooms;
//        else if(role == UserCategories.LandlordClient)
//        {
//            this.rooms = rooms;
//            this.reservationSet = reservationSet;
//        }
//    }
//    public User(String name, String surname, String email, long telephone, String photo, String country, UserCategories role, String username, String password) {
//        this.name = name;
//        this.surname = surname;
//        this.email = email;
//        this.telephone = telephone;
//        this.photo = photo;
//        this.country = country;
//        this.role = role;
//        this.username = username;
//        this.password = password;
//        this.reservationSet = null;
//        this.rooms = null;
//    }


    public User(String name, String surname, String email, long telephone, String country, UserCategories role, String username, String password, Set<Reservation> reservationSet, Set<Room> rooms, Photos userPhoto) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.telephone = telephone;
        this.country = country;
        this.role = role;
        this.username = username;
        this.password = password;
        this.reservationSet = reservationSet;
        this.rooms = rooms;
        this.userPhoto = userPhoto;
    }

    public User(String name, String surname, String email, long telephone, String country, UserCategories role, String username, String password) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.telephone = telephone;
        this.country = country;
        this.role = role;
        this.username = username;
        this.password = password;
    }

    public User() {

    }

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public long getTelephone() {
        return telephone;
    }

    public void setTelephone(long telephone) {
        this.telephone = telephone;
    }

//    public String getPhoto() {
//        return photo;
//    }
//
//    public void setPhoto(String photo) {
//        this.photo = photo;
//    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public UserCategories getRole() {
        return role;
    }

    public void setRole(UserCategories role) {
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Reservation> getReservationSet() {
        return reservationSet;
    }

    public void setReservationSet(Set<Reservation> reservationSet) {
        this.reservationSet = reservationSet;
    }

    public Set<Room> getRooms() {
        return rooms;
    }

    public void setRooms(Set<Room> rooms) {
        this.rooms = rooms;
    }

    public Photos getUserPhoto() {
        return userPhoto;
    }

    public void setUserPhoto(Photos userPhoto) {
        this.userPhoto = userPhoto;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Id == user.Id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(Id);
    }
}
