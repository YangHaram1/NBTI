package com.nbti.controllers;

import java.sql.Timestamp;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nbti.services.AttendanceService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceService aServ;

    @PostMapping("/clock-in")
    public ResponseEntity<Map<String, Object>> clockIn(HttpServletRequest request) {
        String memberId = (String) request.getSession().getAttribute("loginID");
        if (memberId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("error", "로그인 상태가 아닙니다."));
        }
        try {
            Map<String, Object> response = aServ.clockIn(memberId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace(); // 로그에 자세한 오류 메시지 출력
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "출근 기록 저장 중 오류가 발생했습니다."));
        }
    }

    @PutMapping("/clock-out")
    public ResponseEntity<Map<String, Object>> clockOut(HttpServletRequest request) {
        String memberId = (String) request.getSession().getAttribute("loginID");
        if (memberId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("error", "로그인 상태가 아닙니다."));
        }
        Timestamp endDate = new Timestamp(System.currentTimeMillis());
        try {
            aServ.clockOut(memberId, endDate);
            return ResponseEntity.ok(Collections.singletonMap("message", "퇴근 시간이 기록되었습니다."));
        } catch (Exception e) {
            e.printStackTrace(); // 로그에 자세한 오류 메시지 출력
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "퇴근 시간 기록 중 오류가 발생했습니다."));
        }
    }

    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getStatus(HttpServletRequest request) {
        String memberId = (String) request.getSession().getAttribute("loginID");
        if (memberId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("error", "로그인 상태가 아닙니다."));
        }
        try {
            Map<String, Object> status = aServ.getStatus(memberId);
            return ResponseEntity.ok(status);
        } catch (Exception e) {
            e.printStackTrace(); // 로그에 자세한 오류 메시지 출력
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "출근 기록 조회 중 오류가 발생했습니다."));
        }
    }

    @GetMapping("/weekly-stats")
    public ResponseEntity<Map<String, Object>> getWeeklyStats(HttpServletRequest request) {
        String memberId = (String) request.getSession().getAttribute("loginID");
        if (memberId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("error", "로그인 상태가 아닙니다."));
        }
        try {
            Map<String, Object> stats = aServ.getWeeklyStats(memberId);
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            e.printStackTrace(); // 로그에 자세한 오류 메시지 출력
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "주간 통계 조회 중 오류가 발생했습니다."));
        }
    }

    @GetMapping("/yearly-stats")
    public ResponseEntity<Map<String, Object>> getYearlyStats(HttpServletRequest request) {
        String memberId = (String) request.getSession().getAttribute("loginID");
        if (memberId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("error", "로그인 상태가 아닙니다."));
        }
        try {
            Map<String, Object> stats = aServ.getYearlyStats(memberId);
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            e.printStackTrace(); // 로그에 자세한 오류 메시지 출력
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "연간 통계 조회 중 오류가 발생했습니다."));
        }
    }
}
