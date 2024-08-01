package com.nbti.controllers;

import java.sql.Timestamp;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nbti.services.AttendanceService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/attendance")
public class AttendanceController {
	
	@Autowired
	private AttendanceService aServ;
	
	@Autowired
	private HttpSession session;
	


	@PostMapping("/clock-in")
	public ResponseEntity<Map<String, Object>> clockIn(HttpServletRequest request) {
	    String memberId = (String) request.getSession().getAttribute("loginID");
	    
	    if (memberId == null) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonMap("error", "로그인 상태가 아닙니다."));
	    }
	    
	    try {
	        int seq = aServ.clockIn(memberId); // 서비스에서 seq 값을 반환합니다.
	        Map<String, Object> response = new HashMap<>();
	        response.put("seq", seq);
	        return ResponseEntity.ok(response);
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("error", "출근 기록 저장 중 오류가 발생했습니다."));
	    }
	}

    @PutMapping("/clock-out")
    public ResponseEntity<String> clockOut(@RequestParam int seq) {
        Timestamp endDate = new Timestamp(System.currentTimeMillis());
        
        try {
            aServ.clockOut(seq, endDate);
            return ResponseEntity.ok("퇴근 시간이 기록되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("퇴근 시간 기록 중 오류가 발생했습니다.");
        }
    }
}
