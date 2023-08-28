package com.travel_website.travel_website_2_backend.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

import java.util.Objects;

@Entity
@Table(name = "requests")
public class Request {

    @Id
    @Column(name = "landlord_id")
    private int landlord;

    @Column
    @NotBlank
    private boolean verified;

    @Column
    @NotBlank
    private boolean pending;

    public Request(int landlord, boolean verified, boolean pending) {
        this.landlord = landlord;
        this.verified = verified;
        this.pending = pending;
    }

    public Request(int landlord, boolean verified) {
        this.landlord = landlord;
        this.verified = verified;
        this.pending = false;
    }

    public Request(int landlord) {
        this.landlord = landlord;
        this.pending = true;
        this.verified = false;
    }

    public Request() {

    }

    public int getLandlord() {
        return landlord;
    }

    public void setLandlord(int landlord) {
        this.landlord = landlord;
    }

    public boolean isVerified() {
        return verified;
    }

    public void setVerified(boolean verified) {
        this.verified = verified;
    }

    public boolean isPending() {
        return pending;
    }

    public void setPending(boolean pending) {
        this.pending = pending;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Request request = (Request) o;
        return landlord == request.landlord && verified == request.verified && pending == request.pending;
    }

    @Override
    public int hashCode() {
        return Objects.hash(landlord, verified, pending);
    }
}
