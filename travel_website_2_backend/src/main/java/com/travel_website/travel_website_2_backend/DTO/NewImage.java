package com.travel_website.travel_website_2_backend.DTO;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class NewImage {

    private MultipartFile image;

}
