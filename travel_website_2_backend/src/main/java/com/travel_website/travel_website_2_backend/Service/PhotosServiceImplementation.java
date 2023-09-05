package com.travel_website.travel_website_2_backend.Service;

import com.travel_website.travel_website_2_backend.Exception.Exception_PhotoNotFound;
import com.travel_website.travel_website_2_backend.Models.Photos;
import com.travel_website.travel_website_2_backend.Repository.PhotosRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class PhotosServiceImplementation implements PhotosService{

    private final PhotosRepository photosRepository;

    @Override
    public Photos savePhoto(Photos photo)
    {
        photosRepository.save(photo);
    }

    @Override
    public void deletePhoto(Photos photo)
    {
        photosRepository.delete(photo);
    }

    @Override
    public Photos validateAndGetPhotoByName(String name)
    {
        return photosRepository.findByName(name)
                .orElseThrow(() -> new Exception_PhotoNotFound("Photo with name " + name + " is not found"));
    }

    @Override
    public Photos validateAndGetPhotoById(int id)
    {
        return photosRepository.findById(id)
                .orElseThrow(() -> new Exception_PhotoNotFound("Photo with id " + id + " is not found"));
    }
}
