package com.nbti.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nbti.dto.ChatDTO;
import com.nbti.dto.Group_memberDTO;
import com.nbti.services.Group_memberService;

@RestController
@RequestMapping("/group_member")
public class Group_memberController {
	@Autowired
	private Group_memberService serv;
	//@RequestParamm(required=true)
	
	@PostMapping
	public ResponseEntity<Void> post(@RequestBody Group_memberDTO dto) throws Exception {
		System.out.println(dto);
		//serv.insert(dto);
		
		return ResponseEntity.ok().build(); // 200  	
	} 
	
}
