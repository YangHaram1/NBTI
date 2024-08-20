//package com.nbti.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.session.web.http.CookieSerializer;
//import org.springframework.session.web.http.DefaultCookieSerializer;
//
//@Configuration
//public class SameSiteConfig {
//	    @Bean
//	    public CookieSerializer cookieSerializer() {
//	        DefaultCookieSerializer serializer = new DefaultCookieSerializer();
//	        serializer.setSameSite("None");
//	        serializer.setUseSecureCookie(false); 
//	        return serializer;
//	    }
//	}
//
