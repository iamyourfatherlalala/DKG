package com.luoyuxia.dkg.configuration;

import org.neo4j.driver.v1.AuthTokens;
import org.neo4j.driver.v1.Driver;
import org.neo4j.driver.v1.GraphDatabase;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
@EnableWebMvc
@ComponentScan(basePackages = "com.luoyuxia.dkg")
@PropertySource("classpath:application.properties")
public class DKGConfiguration extends WebMvcConfigurerAdapter{
    @Value("${neo4j.db.url}")
    private String neo4jUrl;
    @Value("${neo4j.db.username}")
    private String username;
    @Value("${neo4j.db.password}")
    private String password;
    @Override
    public void addResourceHandlers(final ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/img/**").addResourceLocations("/static/img/");
    }
    @Bean
    public MultipartResolver multipartResolver() {
        CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver();
        multipartResolver.setMaxUploadSize(10485760); // 10MB
        multipartResolver.setMaxUploadSizePerFile(1048576); // 1MB
        return multipartResolver;
    }
    @Bean
    public Driver neo4jDriver() {
        return GraphDatabase.driver(neo4jUrl, AuthTokens.basic(username, password));
    }
}
