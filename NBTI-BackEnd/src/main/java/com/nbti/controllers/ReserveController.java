package com.nbti.controllers;

import java.util.List;
import java.util.Map;

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
	
	//예약
	@PostMapping
	public ResponseEntity<Void> insert(@RequestBody ReserveDTO dto) throws Exception{
		dto.setMember_id((String)session.getAttribute("loginID"));
		rserv.insert(dto);
		return ResponseEntity.ok().build();
	}
	
	//예약 목록
	@GetMapping
	public ResponseEntity<List<ReserveDTO>> waitingList () throws Exception{
		List<ReserveDTO> list = rserv.waitingList();
		return ResponseEntity.ok(list);
	}
	
	//대기 목록 
	@GetMapping("/waitList")
	public ResponseEntity<List<ReserveDTO>> waitList () throws Exception{
		List<ReserveDTO> list = rserv.waitList();
		return ResponseEntity.ok(list);
	}
	
	//업데이트 N -> Y 
    @PostMapping("/approve")
    public ResponseEntity<Void> update(@RequestBody Map<String, Integer> request) {
        Integer seq = request.get("seq");
        if (seq != null) {
            try {
                rserv.update(seq); // 예약 상태 업데이트
                return ResponseEntity.ok().build();
            } catch (Exception e) {
                e.printStackTrace(); // 예외를 로그에 기록
                return ResponseEntity.status(500).build();
            }
        } else {
            return ResponseEntity.badRequest().build(); 
        }
    }









	
	
	@ExceptionHandler(Exception.class)
	public String exceptionHandler(Exception e) {
		e.printStackTrace();
		return "error";
	}
}
