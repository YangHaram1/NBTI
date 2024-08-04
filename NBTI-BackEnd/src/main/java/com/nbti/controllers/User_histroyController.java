package com.nbti.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nbti.dto.User_historyDTO;
import com.nbti.services.User_historyService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/user_history")
public class User_histroyController {
	
	@Autowired
	private User_historyService serv;
	
	@Autowired
	private HttpSession session;

	@GetMapping
	public ResponseEntity<List<User_historyDTO>> get() throws Exception{
		String loginID= (String) session.getAttribute("loginID");
		
		return ResponseEntity.ok().build();
	}
}
