package com.nbti.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nbti.dto.CalendarDTO;
import com.nbti.services.CalendarService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/calendar")
public class CalendarController {
	@Autowired
	private CalendarService cserv;
	@Autowired
	private HttpSession session;
	

    // 캘린더 입력
    @PostMapping
    public ResponseEntity<Void> insert(@RequestBody CalendarDTO dto) {
        System.out.println(dto.getSeq() + " seq");
        dto.setMember_id((String) session.getAttribute("loginID"));
        cserv.insert(dto);
        return ResponseEntity.ok().build();
    }
}
