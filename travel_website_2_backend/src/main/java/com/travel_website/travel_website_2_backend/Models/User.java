package com.travel_website.travel_website_2_backend.Models;

//import com.travel_website.travel_website_2_backend.Exception.EntityException;
import jakarta.persistence.*;
import org.antlr.v4.runtime.misc.NotNull;

import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "users")
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int Id;

    @Column(name = "name")
    @NotNull
    private String name;

    @Column(name = "surname")
    @NotNull
    private String surname;

    @Column(name = "email")
    @NotNull
    private String email;

    @Column(name = "telephone", length = 14)
    @NotNull
    private long telephone;

    @Column(name = "photo")
    @NotNull
    //TODO Add default picture with "default <path to default picture>" after line below
    private String photo;

    @Column(name = "country")
    private String country;

    @Column(name = "role")
    private UserCategories role;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    public static class UserBuilder{

        private int id;
        private String name;
        private String surname;
        private String email;
        private long telephone;
        private String photo;
        private String country;
        private UserCategories role;
        private String username;
        private String password;

        public UserBuilder(int id, String name, String surname, String email, long telephone, String photo, String country, UserCategories role, String username, String password) {
            this.id = id;
            this.name = name;
            this.surname = surname;
            this.email = email;
            this.telephone = telephone;
            this.photo = photo;
            this.country = country;
            this.role = role;
            this.username = username;
            this.password = password;
        }



        public UserBuilder() {

        }

        public void setId(int id) {
            this.id = id;
        }

        public void setName(String name) {
            this.name = name;
        }

        public void setSurname(String surname) {
            this.surname = surname;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public void setTelephone(long telephone) {
            this.telephone = telephone;
        }

        public void setPhoto(String photo) {
            this.photo = photo;
        }

        public void setCountry(String country) {
            this.country = country;
        }

        public void setRole(UserCategories role) {
            this.role = role;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public void setPassword(String password) {
            this.password = password;
        }

//        public User build() throws EntityException {
//            return new User(this);
//        }

    }

    public User(String name, String surname, String email, long telephone, String photo, String country, UserCategories role, String username, String password) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.telephone = telephone;
        this.photo = photo;
        this.country = country;
        this.role = role;
        this.username = username;
        this.password = password;
    }

//    public User(UserBuilder builder) throws EntityException {
//        super();
//        setId(builder.id);
//        setName(builder.name);
//        setSurname(builder.surname);
//        setEmail(builder.email);
//        setTelephone(builder.telephone);
//        setPhoto(builder.photo);
//        setCountry(builder.country);
//        setRole(builder.role);
//        setUsername(builder.username);
//        setPassword(builder.password);
//    }

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

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

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
