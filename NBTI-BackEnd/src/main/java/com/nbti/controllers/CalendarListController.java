package com.nbti.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	
	// 공유 캘린더 목록
	@GetMapping
	public ResponseEntity<List<CalendarListDTO>> list () throws Exception{
		String member_id = (String) session.getAttribute("loginID");
    	List<CalendarListDTO> list = clserv.list(member_id);
    	return ResponseEntity.ok(list);
	}
	
	// 공유 캘린더 추가
//    @PostMapping
//    public ResponseEntity<Void> insert(@RequestBody CalendarListDTO dto) throws Exception{
//        dto.setMember_id((String) session.getAttribute("loginID")); // ID가 일치하는 경우에만 설정
//        
//        clserv.insert(dto);
//        return ResponseEntity.ok().build();
//    }
    
	@PostMapping
	public ResponseEntity<Void> insert(@RequestBody Map<String, Object> requestBody) throws Exception {
	    // 세션에서 로그인 ID를 가져와 member_id에 설정
	    String memberId = (String) session.getAttribute("loginID");

	    // 요청 본문에서 각 필드 값을 가져오기
	    String calendarName = (String) requestBody.get("calendar_name");
	    String calendarType = (String) requestBody.get("calendar_type");
	    List<String> calendarMembers = (List<String>) requestBody.get("calendar_members");

	    // 데이터 확인을 위한 출력
	    System.out.println("Calendar Name: " + calendarName);
	    System.out.println("Calendar Type: " + calendarType);
	    System.out.println("Calendar Members: " + calendarMembers);
	    System.out.println("Member ID: " + memberId);

	    // 클 서비스에 저장
	    clserv.insert(new CalendarListDTO(0, memberId, calendarName, calendarType));

	    int lastCalID = clserv.getLastCalendarID();
	    for(String calendarMember : calendarMembers) {
	    	System.out.println(calendarMember);
	    	clserv.insertMember(lastCalID,calendarMember);
	    }
	    
	    return ResponseEntity.ok().build();
	}
}
