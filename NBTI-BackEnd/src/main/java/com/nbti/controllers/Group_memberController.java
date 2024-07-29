package com.nbti.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nbti.dto.Group_memberDTO;
import com.nbti.services.Group_memberService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/group_member")
public class Group_memberController {
	
	@Autowired
	private Group_memberService serv;
	//@RequestParamm(required=true)
	@Autowired
	private HttpSession session;
	
	@PostMapping
	public ResponseEntity<Void> post(@RequestBody Group_memberDTO dto) throws Exception {
		System.out.println(dto);
		//serv.insert(dto);
		return ResponseEntity.ok().build(); // 200  	
	} 
	
	@DeleteMapping()
	public ResponseEntity<Void> delete(int group_seq) throws Exception{
		System.out.println(group_seq);
		//seq =group_seq
		String loginID= (String) session.getAttribute("loginID");
		serv.delete(group_seq,loginID);
		return ResponseEntity.ok().build();
	}
	
	@GetMapping
	public ResponseEntity<List<Group_memberDTO>> get(int group_seq) throws Exception{
		
		
		return ResponseEntity.ok(serv.members(group_seq));
	}
}
