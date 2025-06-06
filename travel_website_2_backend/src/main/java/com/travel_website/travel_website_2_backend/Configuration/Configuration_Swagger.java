package com.travel_website.travel_website_2_backend.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Configuration_Swagger {

    @Value("${spring.application.name}")
    private String application;

    @Bean
    public OpenAPI customOpenAPI()
    {
        return new OpenAPI()
                .components(
                        new Components().addSecuritySchemes(BEARER_KEY_SECURITY_SCHEME,
                                new SecurityScheme().type(SecurityScheme.Type.HTTP).scheme("bearer").bearerFormat("JWT"))

                )
                .info(new Info().title(application));
    }

    public static final String BEARER_KEY_SECURITY_SCHEME = "bearer-key";
}
