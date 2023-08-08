package com.travel_website.travel_website_2_backend.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

import java.util.Objects;

@Entity
@Table(name="Address")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="houseNumber")
    @NotBlank
    private int houseNumber;

    @Column(name="street")
    @NotBlank
    private String street;

    @Column(name="city")
    @NotBlank
    private String city;

    @Column(name="postCode")
    @Min(value=5)
    @Max(value=5)
    @NotBlank
    private int postCode;

    @Column(name="country")
    @NotBlank
    private String country;

    @Column(name="latitude")
    private double latitude;

    @Column(name="longtitude")
    private double longtitude;

    @OneToOne(mappedBy = "location")
    private Location location;

    public Address(int houseNumber, String street, String city, int postCode, String country, double latitude, double longtitude, Location location) {
        this.houseNumber = houseNumber;
        this.street = street;
        this.city = city;
        this.postCode = postCode;
        this.country = country;
        this.latitude = latitude;
        this.longtitude = longtitude;
        this.location = location;
    }

    public Address() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getHouseNumber() {
        return houseNumber;
    }

    public void setHouseNumber(int houseNumber) {
        this.houseNumber = houseNumber;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public int getPostCode() {
        return postCode;
    }

    public void setPostCode(int postCode) {
        this.postCode = postCode;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongtitude() {
        return longtitude;
    }

    public void setLongtitude(double longtitude) {
        this.longtitude = longtitude;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Address address = (Address) o;
        return houseNumber == address.houseNumber && postCode == address.postCode && Objects.equals(street, address.street) && Objects.equals(city, address.city) && Objects.equals(country, address.country);
    }

    public boolean equalsCoordinates(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Address address = (Address) o;
        return latitude==address.latitude && longtitude==address.longtitude;
    }

}
