package com.nbti.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
public class HomeController {

	@RequestMapping("/home")
	public String home() {
		System.out.println("home");
		return "index.html";
	}
	
}
