package com.nbti.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nbti.dto.Group_memberDTO;
import com.nbti.services.Group_chatService;
import com.nbti.services.Group_memberService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/group_chat")
public class Group_chatController {
	
	
	@Autowired
	private Group_chatService serv;
	//@RequestParamm(required=true)
	
	@Autowired
	private HttpSession session;
	
	@Autowired
	private Group_memberService mserv;
	
	@PostMapping
	public ResponseEntity<Void> post(String member_id) throws Exception {
		List<String> list =new ArrayList<>();
		String loginID= (String) session.getAttribute("loginID");
		
		list.add(member_id);
		list.add(loginID);
		boolean check=mserv.check(list);
		
		if(!check) {
			int seq=serv.insert(member_id);
			
			List<Group_memberDTO> member_list=new ArrayList<>();
			for(int i=0; i<list.size();i++) {
				Group_memberDTO dto= new Group_memberDTO(seq,list.get(i),"N","","");
				member_list.add(dto);
			}
			
			mserv.insert(member_list);
		}
		
		return ResponseEntity.ok().build(); // 200  	
	} 
	
	
	
	@ExceptionHandler(Exception.class)
	public String exceptionHandler(Exception e) {
		e.printStackTrace();
		return "error";
	}
}
