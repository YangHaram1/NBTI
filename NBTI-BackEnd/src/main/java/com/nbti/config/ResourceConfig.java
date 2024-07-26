package com.nbti.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class ResourceConfig  implements WebMvcConfigurer{
	
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/images/**").addResourceLocations("file:c:/images/");
		//http://192.168.1.179/images react에서 img src 설정
		
	}

	
}
