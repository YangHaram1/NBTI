package com.nbti.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nbti.dto.ChatDTO;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/auth")
public class AuthController {
	
	
	
	//private MembersService mServ;
	@Autowired
	private HttpSession session;
	
	@PostMapping
	public ResponseEntity<String> postMethodName(@RequestBody String entity) {
		System.out.println(entity);
		session.setAttribute("loginID",entity);
		//System.out.println(session.getAttribute("loginID"));
		return ResponseEntity.ok(entity);
	}
	
	@GetMapping
	public ResponseEntity<List<ChatDTO>> get(){
		
		//System.out.println(session.getAttribute("loginID"));
		ResponseEntity.status(HttpStatus.UNAUTHORIZED);
		return ResponseEntity.ok(null);
	}
}
