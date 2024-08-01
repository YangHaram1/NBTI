package com.nbti.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nbti.dto.AttendanceDTO;
import com.nbti.services.AttendanceService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/attendance")
public class AttendanceController {
	
	@Autowired
	private AttendanceService aServ;
	
	@Autowired
	private HttpSession session;
	
	
	@PostMapping("/clock-in")
    public void clockIn() {
        String memberId = (String) session.getAttribute("loginID");
        System.out.println(memberId);
        aServ.clockIn(memberId);
    }

	
}
