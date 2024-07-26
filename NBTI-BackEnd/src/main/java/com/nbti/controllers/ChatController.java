package com.nbti.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nbti.dto.ChatDTO;
import com.nbti.services.ChatService;

@RestController
@RequestMapping("/chat")
public class ChatController {
	
	@Autowired
	private ChatService cserv;
	//@RequestParamm(required=true)
	
	@PostMapping
	public ResponseEntity<Void> post(@RequestBody ChatDTO dto) {
	
		return ResponseEntity.ok().build(); // 200  	
	} 
	
	@GetMapping
	public ResponseEntity<List<ChatDTO>> get(String search) throws Exception{
		 List<ChatDTO> list=new ArrayList<>();
		if(search!=null) {
			list=cserv.searchList(search);
		}
		else {
			list =cserv.getList();
		}
		return ResponseEntity.ok(list);
	}
	
	
	@DeleteMapping("/")
	public void delete() throws Exception{
		
	}
	
	
	@ExceptionHandler(Exception.class)
	public String exceptionHandler(Exception e) {
		e.printStackTrace();
		return "error";
	}
}