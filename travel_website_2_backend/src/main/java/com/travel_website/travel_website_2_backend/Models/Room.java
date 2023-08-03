package com.travel_website.travel_website_2_backend.Models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "room")
public class Room {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "type_of_room")
    @NotBlank
    private TypeOfRoom typeofroom;

    @Column(name = "num_of_beds")
    @NotBlank
    @Min(value = 1, message = "At least one bed")
    private int numOfBeds;

    @Column(name = "num_of_baths")
    @NotBlank
    @Min(value = 1, message = "At least one bed")
    private int numOfBaths;

    @Column(name = "num_of_bedrooms")
    @NotBlank
    @Min(value = 1, message = "At least one bed")
    private int numOfBedrooms;

    @Column(name = "livingroom")
    @NotBlank
    private boolean livingRoom;

    @Column(name = "area")
    @NotBlank
    private int area;

    @Column(name = "description")
    @NotBlank
    //TODO set limit of 1000 characters
    private String description;

    //Rules
    @Column(name = "smoking")
    @NotBlank
    private boolean smoking;

    @Column(name = "pets")
    @NotBlank
    private boolean pets;

    @Column(name = "events")
    @NotBlank
    private boolean events;

    @Column(name = "minimum_days")
    @NotBlank
    private int minimumDays;

    @ManyToOne
    private Location location;

    //TODO add photos

    @Column(name = "internet")
    @NotBlank
    private boolean internet;

    @Column(name = "cooling")
    @NotBlank
    private boolean cooling;

    @Column(name = "heating")
    @NotBlank
    private boolean heating;

    @Column(name = "kitchen")
    @NotBlank
    private boolean kitchen;

    @Column(name = "tv")
    @NotBlank
    private boolean tv;

    @Column(name = "parking")
    @NotBlank
    private boolean parking;

    @Column(name = "elevator")
    @NotBlank
    private boolean elevator;

    @OneToMany(mappedBy = "bookedRoom")
    private Set<Reservation> reservations;

    @ManyToOne
    private User landlord;

    public Room() {

    }

    public Room(TypeOfRoom typeofroom, int numOfBeds, int numOfBaths, int numOfBedrooms, boolean livingRoom, int area, String description, boolean smoking, boolean pets, boolean events, int minimumDays, Location location, boolean internet, boolean cooling, boolean heating, boolean kitchen, boolean tv, boolean parking, boolean elevator) {
        this.typeofroom = typeofroom;
        this.numOfBeds = numOfBeds;
        this.numOfBaths = numOfBaths;
        this.numOfBedrooms = numOfBedrooms;
        this.livingRoom = livingRoom;
        this.area = area;
        this.description = description;
        this.smoking = smoking;
        this.pets = pets;
        this.events = events;
        this.minimumDays = minimumDays;
        this.location = location;
        this.internet = internet;
        this.cooling = cooling;
        this.heating = heating;
        this.kitchen = kitchen;
        this.tv = tv;
        this.parking = parking;
        this.elevator = elevator;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public TypeOfRoom getTypeofroom() {
        return typeofroom;
    }

    public void setTypeofroom(TypeOfRoom typeofroom) {
        this.typeofroom = typeofroom;
    }

    public int getNumOfBeds() {
        return numOfBeds;
    }

    public void setNumOfBeds(int numOfBeds) {
        this.numOfBeds = numOfBeds;
    }

    public int getNumOfBaths() {
        return numOfBaths;
    }

    public void setNumOfBaths(int numOfBaths) {
        this.numOfBaths = numOfBaths;
    }

    public int getNumOfBedrooms() {
        return numOfBedrooms;
    }

    public void setNumOfBedrooms(int numOfBedrooms) {
        this.numOfBedrooms = numOfBedrooms;
    }

    public boolean isLivingRoom() {
        return livingRoom;
    }

    public void setLivingRoom(boolean living_room) {
        this.livingRoom = living_room;
    }

    public int getArea() {
        return area;
    }

    public void setArea(int area) {
        this.area = area;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isSmoking() {
        return smoking;
    }

    public void setSmoking(boolean smoking) {
        this.smoking = smoking;
    }

    public boolean isPets() {
        return pets;
    }

    public void setPets(boolean pets) {
        this.pets = pets;
    }

    public boolean isEvents() {
        return events;
    }

    public void setEvents(boolean events) {
        this.events = events;
    }

    public int getMinimumDays() {
        return minimumDays;
    }

    public void setMinimumDays(int minimum_days) {
        this.minimumDays = minimum_days;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public boolean isInternet() {
        return internet;
    }

    public void setInternet(boolean internet) {
        this.internet = internet;
    }

    public boolean isCooling() {
        return cooling;
    }

    public void setCooling(boolean cooling) {
        this.cooling = cooling;
    }

    public boolean isHeating() {
        return heating;
    }

    public void setHeating(boolean heating) {
        this.heating = heating;
    }

    public boolean isKitchen() {
        return kitchen;
    }

    public void setKitchen(boolean kitchen) {
        this.kitchen = kitchen;
    }

    public boolean isTv() {
        return tv;
    }

    public void setTv(boolean tv) {
        this.tv = tv;
    }

    public boolean isParking() {
        return parking;
    }

    public void setParking(boolean parking) {
        this.parking = parking;
    }

    public boolean isElevator() {
        return elevator;
    }

    public void setElevator(boolean elevator) {
        this.elevator = elevator;
    }

    public Set<Reservation> getReservations() {
        return reservations;
    }

    public void setReservations(Set<Reservation> reservations) {
        this.reservations = reservations;
    }

    public User getLandlord() {
        return landlord;
    }

    public void setLandlord(User landlord) {
        this.landlord = landlord;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Room room = (Room) o;
        return id == room.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }


}
