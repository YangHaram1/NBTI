package com.nbti.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nbti.services.User_historyService;

@RestController
@RequestMapping("/user_history")
public class User_histroyController {
	
	@Autowired
	private User_historyService serv;
	
	
}
