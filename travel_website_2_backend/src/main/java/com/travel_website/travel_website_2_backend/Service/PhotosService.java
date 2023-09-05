package com.travel_website.travel_website_2_backend.Service;

import com.travel_website.travel_website_2_backend.Models.Photos;

public interface PhotosService {

    Photos savePhoto(Photos photo);

    void deletePhoto(Photos photo);

    Photos validateAndGetPhotoByName(String name);

    Photos validateAndGetPhotoById(int id);

}
