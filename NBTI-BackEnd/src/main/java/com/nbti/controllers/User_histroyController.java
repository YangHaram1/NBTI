package com.nbti.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
	public ResponseEntity<Map<String, Object>> get(@RequestParam int start,@RequestParam int end,@RequestParam String target,@RequestParam String keyword) throws Exception{
		List<User_historyDTO> list =new ArrayList<>();
		Map<String, Object> params= new HashMap<>();
		params.put("start", start);
		params.put("end", end);
		params.put("target", target);
		params.put("keyword", keyword);
		list=serv.list(params);
		
		Map<String, Object> result =new HashMap<>();
		result.put("list", list);
		result.put("count", serv.getHistoryCount(params));
		return ResponseEntity.ok(result);
	}
	
}
