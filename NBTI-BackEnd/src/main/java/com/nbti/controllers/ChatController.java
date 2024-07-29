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

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/chat")
public class ChatController {
	
	@Autowired
	private ChatService cserv;
	//@RequestParamm(required=true)
	@Autowired
	private HttpSession session;
	
	
	@PostMapping
	public ResponseEntity<Void> post(@RequestBody ChatDTO dto) {
	
		return ResponseEntity.ok().build(); // 200  	
	} 
	
	@GetMapping
	public ResponseEntity<List<ChatDTO>> get(String search,int chatSeq) throws Exception{
		 List<ChatDTO> list=new ArrayList<>();
		 System.out.println(chatSeq);
		if(search!=null) {
			list=cserv.searchList(search,chatSeq);
		}
		else {
			list =cserv.getList(chatSeq);
		}
		session.setAttribute("group_seq", chatSeq);
		return ResponseEntity.ok(list);
	}
	
	
	
	@DeleteMapping()
	public void delete() throws Exception{
		
	}
	
	
	@ExceptionHandler(Exception.class)
	public String exceptionHandler(Exception e) {
		e.printStackTrace();
		return "error";
	}
}