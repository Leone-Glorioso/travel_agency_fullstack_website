package com.travel_website.travel_website_2_backend.Security;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;
import org.springframework.web.multipart.support.MultipartFilter;

@Configuration
public class Configuration_MultipartFiles {

    @Bean
    public StandardServletMultipartResolver commonsMultipartResolver() {
        final StandardServletMultipartResolver commonsMultipartResolver = new StandardServletMultipartResolver();
        return commonsMultipartResolver;
    }

    @Bean
    public FilterRegistrationBean multipartFilterRegistrationBean() {
        final MultipartFilter multipartFilter = new MultipartFilter();
        final FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean(multipartFilter);
        filterRegistrationBean.addInitParameter("multipartResolverBeanName", "commonsMultipartResolver");
        return filterRegistrationBean;
    }
}