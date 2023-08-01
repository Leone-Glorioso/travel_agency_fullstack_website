package com.travel_website.travel_website_2_backend.Models;
//import org.openstreetmap.gui.*;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import org.antlr.v4.runtime.misc.NotNull;

import java.util.Objects;

@Entity
@Table(name = "location")
public class Location {
//TODO add openstreetmap
    @Id
    @Column(name = "id")
    private int id;

    @Column(name = "address")
    @NotBlank
    private String address;
    @Column(name = "neighbourhood")
    @NotBlank
    private String neighbourhood;
    @Column(name = "transportation")
    @NotBlank
    private String transportation;

    public Location(String address, String neighbourhood, String transportation) {
        this.address = address;
        this.neighbourhood = neighbourhood;
        this.transportation = transportation;
    }

    public Location() {

    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getNeighbourhood() {
        return neighbourhood;
    }

    public void setNeighbourhood(String neighbourhood) {
        this.neighbourhood = neighbourhood;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTransportation() {
        return transportation;
    }

    public void setTransportation(String transportation) {
        this.transportation = transportation;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Location location = (Location) o;
        return id == location.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
