package com.nbti.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nbti.dto.CalendarDTO;
import com.nbti.dto.CalendarListDTO;
import com.nbti.services.CalendarListService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/calendarList")
public class CalendarListController {
	@Autowired
	private CalendarListService clserv;
	@Autowired
	private HttpSession session;
	
	
	@GetMapping
	public ResponseEntity<List<CalendarListDTO>> list () throws Exception{
		String member_id = (String) session.getAttribute("loginID");
    	List<CalendarListDTO> list = clserv.list(member_id);
    	return ResponseEntity.ok(list);
	}
	
	// 입력
    @PostMapping
    public ResponseEntity<Void> insert(@RequestBody CalendarListDTO dto) throws Exception{
        dto.setMember_id((String) session.getAttribute("loginID")); // ID가 일치하는 경우에만 설정
        clserv.insert(dto);
        return ResponseEntity.ok().build();
    }
	
}
