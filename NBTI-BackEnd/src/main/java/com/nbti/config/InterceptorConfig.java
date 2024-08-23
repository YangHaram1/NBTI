package com.nbti.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.nbti.interceptors.Loginvalidator;

@Configuration
public class InterceptorConfig implements WebMvcConfigurer{
	@Autowired
	private Loginvalidator lv;
	
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(lv).addPathPatterns("/**").excludePathPatterns("/auth/**","/chatWebsocket");
	}
	
}
