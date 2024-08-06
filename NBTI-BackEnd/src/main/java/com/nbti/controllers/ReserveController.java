package com.nbti.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nbti.dto.ReserveDTO;
import com.nbti.services.ReserveService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/reserve")
public class ReserveController {
	
	@Autowired
	private ReserveService rserv;
	@Autowired
	private HttpSession session;
	
	@PostMapping
	public ResponseEntity<Void> insert(@RequestBody ReserveDTO dto) throws Exception{
		dto.setMember_id((String)session.getAttribute("loginID"));
		rserv.insert(dto);
		return ResponseEntity.ok().build();
	}
	
	@GetMapping
	public ResponseEntity<List<ReserveDTO>> waitingList () throws Exception{
		List<ReserveDTO> list = rserv.waitingList();
		return ResponseEntity.ok(list);
	}
	
	
	@ExceptionHandler(Exception.class)
	public String exceptionHandler(Exception e) {
		e.printStackTrace();
		return "error";
	}
}
