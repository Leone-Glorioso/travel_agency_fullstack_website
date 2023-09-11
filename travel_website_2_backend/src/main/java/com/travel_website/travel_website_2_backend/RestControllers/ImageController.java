package com.travel_website.travel_website_2_backend.RestControllers;

import com.travel_website.travel_website_2_backend.Service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.apache.commons.io.FilenameUtils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/image")
public class ImageController {

    @Autowired
    private StorageService service;

    @PostMapping
    public ResponseEntity<?> uploadImage(@RequestParam("image")MultipartFile file) throws IOException {
        String uploadImage = service.uploadImage(file);
        return ResponseEntity.status(HttpStatus.OK)
                .body(uploadImage);
    }

    @GetMapping("/{fileName}")
    public ResponseEntity<?> downloadImage(@PathVariable String fileName){
        byte[] imageData=service.downloadImage(fileName);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(imageData);

    }



//    private static String imageDirectory = System.getProperty("user.dir") + "/images/";
//
//    @RequestMapping(value = "/image", produces = {MediaType.IMAGE_PNG_VALUE, "application/json"})
//    public ResponseEntity<?> uploadImage(@RequestParam("imageFile") MultipartFile file,
//                                         @RequestParam("imageName") String name) {
//        makeDirectoryIfNotExist(imageDirectory);
//        Path fileNamePath = Paths.get(imageDirectory,
//                name.concat(".").concat(FilenameUtils.getExtension(file.getOriginalFilename())));
//        try {
//            Files.write(fileNamePath, file.getBytes());
//            return new ResponseEntity<>(name, HttpStatus.CREATED);
//        } catch (IOException ex) {
//            return new ResponseEntity<>("Image is not uploaded", HttpStatus.BAD_REQUEST);
//        }
//    }
//
//    private void makeDirectoryIfNotExist(String imageDirectory) {
//        File directory = new File(imageDirectory);
//        if (!directory.exists()) {
//            directory.mkdir();
//        }
//    }
}
