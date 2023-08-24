//package com.travel_website.travel_website_2_backend.Models;
//
//import jakarta.persistence.Embeddable;
//import jakarta.persistence.Table;
//
//import java.io.Serializable;
//import java.util.Objects;
//
//@Embeddable
//@Table(name = "LocationIDs")
//public class LocationID implements Serializable
//{
//    private double latitude;
//    private double longitude;
//
//    public LocationID(double latitude, double longitude) {
//        this.latitude = latitude;
//        this.longitude = longitude;
//    }
//
//    public LocationID() {
//
//    }
//
//    public double getLatitude() {
//        return latitude;
//    }
//
//    public void setLatitude(double latitude) {
//        this.latitude = latitude;
//    }
//
//    public double getLongitude() {
//        return longitude;
//    }
//
//    public void setLongitude(double longitude) {
//        this.longitude = longitude;
//    }
//
//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//        if (o == null || getClass() != o.getClass()) return false;
//        LocationID that = (LocationID) o;
//        return Double.compare(latitude, that.latitude) == 0 && Double.compare(longitude, that.longitude) == 0;
//    }
//
//    @Override
//    public int hashCode() {
//        return Objects.hash(latitude, longitude);
//    }
//}