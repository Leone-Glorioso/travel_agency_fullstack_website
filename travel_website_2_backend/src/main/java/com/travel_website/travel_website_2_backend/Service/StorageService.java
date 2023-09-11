package com.travel_website.travel_website_2_backend.Service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface StorageService {
    String uploadImage(MultipartFile file) throws IOException;

    byte[] downloadImage(String fileName);
}
