package com.nbti.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CORSConfig implements WebMvcConfigurer{
	//.allowedOrigins("http://192.168.1.179:3000")
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")    

		.allowedOriginPatterns("*")
<<<<<<< HEAD
//		.allowedOrigins("http://3.39.251.78", "https://nbti-e947e.web.app","https://nbti-e947e.firebaseapp.com/") // ws://은 일반적으로 CORS와 관련이 없습니다
=======
		//.allowedOrigins("http://3.39.251.78", "https://nbti-e947e.web.app","https://nbti-e947e.firebaseapp.com/") // ws://은 일반적으로 CORS와 관련이 없습니다
>>>>>>> fa43758824ba10b38e6b957a9ad810bcc7c8c065
        .allowedMethods("*")

        .allowedHeaders("*")
        .allowCredentials(true);
		
	}
}

