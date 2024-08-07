package com.nbti.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nbti.dto.Group_memberDTO;
import com.nbti.services.GroupService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/group")
public class GroupController {
	@Autowired
	private HttpSession session;
	
	@Autowired
	private GroupService serv;
	
	@GetMapping
	public ResponseEntity<List<Map<String, Object>>> get() throws Exception{
		List<Map<String, Object>> result =serv.getGroup();
		return ResponseEntity.ok(result);
	}
}
