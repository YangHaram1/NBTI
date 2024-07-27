package com.nbti.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nbti.dto.ChatDTO;
import com.nbti.services.Group_chatService;

@RestController
@RequestMapping("/group_chat")
public class Group_chatController {
	
	
	@Autowired
	private Group_chatService serv;
	//@RequestParamm(required=true)
	
	@PostMapping
	public ResponseEntity<Void> post(@RequestBody ChatDTO dto) {
	
		return ResponseEntity.ok().build(); // 200  	
	} 
}
