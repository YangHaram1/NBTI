package com.nbti.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nbti.dto.ChatDTO;
import com.nbti.dto.Group_chatDTO;
import com.nbti.dto.Group_chatSizeDTO;
import com.nbti.dto.Group_memberDTO;
import com.nbti.services.ChatService;
import com.nbti.services.Group_chatService;
import com.nbti.services.Group_memberService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/group_chat")
public class Group_chatController {
	

	@Autowired
	private HttpSession session;
	
	
	
	@Autowired
	private Group_chatService serv;
	//@RequestParamm(required=true)
	
	
	@Autowired
	private Group_memberService mserv;
	
	@Autowired
	private ChatService cserv;
	
	@PostMapping
	public ResponseEntity<Void> post(String member_id,String name) throws Exception {
		
		String loginID= (String) session.getAttribute("loginID");
		serv.insert(member_id, loginID);	
		return ResponseEntity.ok().build(); // 200  	
	} 
	
	
	@GetMapping
	public ResponseEntity<List<Group_chatSizeDTO>> get() throws Exception{
		String loginID= (String) session.getAttribute("loginID");
		List<Group_chatSizeDTO> result =serv.getChatSizeDTOs(loginID);
		return ResponseEntity.ok(result);
	}
	
	@GetMapping("/invite")
	public ResponseEntity<String> getInvite(int group_seq) throws Exception{
		String result =serv.getInvite(group_seq);
		return ResponseEntity.ok(result);
	}
	
	
	@DeleteMapping()
	public ResponseEntity<Void> delete(int seq) throws Exception{
		serv.delete(seq);
		return ResponseEntity.ok().build();
	}
	
	@ExceptionHandler(Exception.class)
	public String exceptionHandler(Exception e) {
		e.printStackTrace();
		return "error";
	}
}
