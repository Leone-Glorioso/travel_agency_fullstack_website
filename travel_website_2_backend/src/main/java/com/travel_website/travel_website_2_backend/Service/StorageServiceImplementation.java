package com.travel_website.travel_website_2_backend.Service;

import com.travel_website.travel_website_2_backend.Misc.ImageUtils;
import com.travel_website.travel_website_2_backend.Models.ImageData;
import com.travel_website.travel_website_2_backend.Repository.StorageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class StorageServiceImplementation implements StorageService{

    private final StorageRepository repository;


    private final String FOLDER_PATH= System.getProperty("user.dir") + "/images/";

    public String uploadImage(MultipartFile file) throws IOException {
        makeDirectoryIfNotExist(FOLDER_PATH);
        ImageData imageData = repository.save(ImageData.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .imageData(ImageUtils.compressImage(file.getBytes())).build());
        if (imageData != null) {
            return "file uploaded successfully : " + file.getOriginalFilename();
        }
        return null;
    }



    public byte[] downloadImage(String fileName) {
        makeDirectoryIfNotExist(FOLDER_PATH);
        Optional<ImageData> dbImageData = repository.findByName(fileName);
        byte[] images = ImageUtils.decompressImage(dbImageData.get().getImageData());
        return images;
    }


    private void makeDirectoryIfNotExist(String imageDirectory) {
        File directory = new File(imageDirectory);
        if (!directory.exists()) {
            directory.mkdir();
        }
    }
}
