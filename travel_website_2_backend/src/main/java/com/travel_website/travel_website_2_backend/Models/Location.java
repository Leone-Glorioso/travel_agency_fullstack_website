package com.travel_website.travel_website_2_backend.Models;
//import org.openstreetmap.gui.*;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.util.Set;

@Entity
@Table(name = "location")
public class Location {
//TODO add openstreetmap
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "neighbourhood")
    @NotBlank
    private String neighbourhood;
    @Column(name = "transportation")
    @NotBlank
    private String transportation;

    @OneToMany(mappedBy = "location")
    private Set<Room> rooms;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id",referencedColumnName = "id")
    private Address address;

    public Location(String neighbourhood, String transportation, Set<Room> rooms, Address address) {
        this.neighbourhood = neighbourhood;
        this.transportation = transportation;
        this.rooms = rooms;
        this.address = address;
    }

    public Location() {

    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
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

    public Set<Room> getRooms() {
        return rooms;
    }

    public void setRooms(Set<Room> rooms) {
        this.rooms = rooms;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Location location = (Location) o;
        return id == location.id;
    }
}
