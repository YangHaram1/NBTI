package com.nbti.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CORSConfig implements WebMvcConfigurer{
	//.allowedOrigins("http://192.168.1.179:3000")
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**").allowedOriginPatterns("*").allowedMethods("*").allowedHeaders("*")
		.allowCredentials(true);
		
	}
}

