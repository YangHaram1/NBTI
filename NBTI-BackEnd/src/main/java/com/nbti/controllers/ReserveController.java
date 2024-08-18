package com.nbti.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	
	//대기 목록
	@GetMapping
	public ResponseEntity<List<ReserveDTO>> waitingList () throws Exception{
		// 세션에서 로그인한 사용자의 ID 가져오기
        String memberId = (String) session.getAttribute("loginID");
        
		List<ReserveDTO> list = rserv.waitingList(memberId);
		return ResponseEntity.ok(list);
	}
	
	//예약 목록
	@GetMapping("/reservationList")
	public ResponseEntity<List<ReserveDTO>> reservationList () throws Exception{
		// 세션에서 로그인한 사용자의 ID 가져오기
        String memberId = (String) session.getAttribute("loginID");
        
		List<ReserveDTO> list = rserv.reservationList(memberId);
		return ResponseEntity.ok(list);
	}
	
    //예약 신청 취소
    @DeleteMapping("/{seq}")
    public ResponseEntity<Void> delete (@PathVariable int seq) throws Exception{
    	rserv.delete(seq);
    	return ResponseEntity.ok().build();
    }
    
    
    
	//승인 N -> Y 
	@PostMapping("/approve")
	public ResponseEntity<Void> update(@RequestBody Map<String, Integer> request) throws Exception {
	    Integer seq = request.get("seq");
	    if (seq != null) {
	        rserv.update(seq); // 예약 상태를 'Y'로 업데이트
	        return ResponseEntity.ok().build();
	    } else {
	        return ResponseEntity.badRequest().build(); 
	    }
	}
	//반려 N -> R 
	@PostMapping("/reject")
	public ResponseEntity<Void> reject(@RequestBody Map<String, Integer> request) throws Exception {
	    Integer seq = request.get("seq");
	    System.out.println("반려 seq :" + seq);
	    if (seq != null) {
	        rserv.reject(seq); // 예약 상태를 'R'로 업데이트
	        return ResponseEntity.ok().build();
	    } else {
	        return ResponseEntity.badRequest().build(); 
	    }
	}

	//승인 관리 - 예약 목록 출력
	@GetMapping("/waitList")
	public ResponseEntity<List<ReserveDTO>> waitList () throws Exception{
		List<ReserveDTO> list = rserv.waitList();
		return ResponseEntity.ok(list);
	}
    //승인 관리 - 승인 목록 출력
    @GetMapping("/approveList")
    public ResponseEntity<List<ReserveDTO>> ApproveList() throws Exception {
        List<ReserveDTO> approveList = rserv.approveList();
        return ResponseEntity.ok(approveList);
    }
    //승인 관리 - 반려 목록 출력
    @GetMapping("/rejectList")
    public ResponseEntity<List<ReserveDTO>> rejectList () throws Exception {
    	List<ReserveDTO> rejectList = rserv.rejectList();
    	return ResponseEntity.ok(rejectList);
    }
    
    @GetMapping("/carList")
    public ResponseEntity<List<ReserveDTO>> carList () throws Exception {
    	List<ReserveDTO> carList = rserv.carList();
    	//System.out.println(rejectList.size());
    	return ResponseEntity.ok(carList);
    }
    @GetMapping("/suppliesList")
    public ResponseEntity<List<ReserveDTO>> suppliesList () throws Exception {
    	List<ReserveDTO> suppliesList = rserv.suppliesList();
    	return ResponseEntity.ok(suppliesList);
    }
    @GetMapping("/meetingRoomList")
    public ResponseEntity<List<ReserveDTO>> meetingRoomList () throws Exception {
    	List<ReserveDTO> meetingRoomList = rserv.meetingRoomList();
    	//System.out.println(rejectList.size());
    	return ResponseEntity.ok(meetingRoomList);
    }
    
    

    
    
	@ExceptionHandler(Exception.class)
	public String exceptionHandler(Exception e) {
		e.printStackTrace();
		return "error";
	}
}
