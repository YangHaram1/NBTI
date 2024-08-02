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

import com.nbti.dto.CalendarListDTO;
import com.nbti.services.CalendarListService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/calendarList")
public class CalendarListController {
	@Autowired
	private CalendarListService cserv;
	@Autowired
	private HttpSession session;
	
	@PostMapping
	public ResponseEntity<Void> insert (@RequestBody CalendarListDTO dto) throws Exception{
        // DTO에서 데이터 가져오기
        int seq = dto.getSeq();
        String name = dto.getName();
        String type = dto.getType();
        
		cserv.insert(dto);
		return ResponseEntity.ok().build();
	}
	
	@GetMapping
	public ResponseEntity<List<CalendarListDTO>> list () throws Exception{ 
		List<CalendarListDTO> list = cserv.list();
		return ResponseEntity.ok(list);
	}
	
	
	
	
	@ExceptionHandler(Exception.class)
	public String exceptionHandler(Exception e) {
		e.printStackTrace();
		return "error";
	}

}
