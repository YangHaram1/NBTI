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

import com.nbti.dto.CalendarListDTO;
import com.nbti.dto.DepartmentDTO;
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
    	for(CalendarListDTO l:list) {
    		System.out.println("calendar id : " + l.getCalendar_id());
    		System.out.println("member id : " + l.getMember_id());
    		System.out.println("calendar name : " + l.getCalendar_name());
    		System.out.println("calendar type : " + l.getCalendar_type());
    		System.out.println("");
    	}
    	return ResponseEntity.ok(list);
	}

    
	// 공유 캘린더 추가 (사용자와 선택된 멤버들을 캘린더에 추가하는 작업)
	@PostMapping
	public ResponseEntity<Void> insert(@RequestBody Map<String, Object> requestBody) throws Exception {
	    String memberId = (String) session.getAttribute("loginID");
	    String calendarName = (String) requestBody.get("calendar_name");
	    String calendarType = (String) requestBody.get("calendar_type");
	    
	    // 캘린더 멤버 리스트 가져오는 작업
	    List<String> calendarMembers = (List<String>) requestBody.get("calendar_members");

	    // 로그인된 사용자 ID를 캘린더 멤버 리스트에 추가
	    if (!calendarMembers.contains(memberId)) {
	        calendarMembers.add(memberId);
	    }

//	    System.out.println("Calendar Name: " + calendarName);
//	    System.out.println("Calendar Type: " + calendarType);
//	    System.out.println("Calendar Members: " + calendarMembers);
//	    System.out.println("Member ID: " + memberId);

	    clserv.insert(new CalendarListDTO(0, memberId, calendarName, calendarType));

	    // 방금 추가한 캘린더의 ID
	    int lastCalID = clserv.getLastCalendarID();
	    
	    // 캘린더 멤버 리스트 
	    for(String calendarMember : calendarMembers) {
//	    	System.out.println(calendarMember); // 각 멤버 ID 출력
	    	clserv.insertMember(lastCalID,calendarMember); // 해당 멤버를 캘린더에 추가
	    }
	    
	    return ResponseEntity.ok().build();
	}
	
	@DeleteMapping("/{calendarName}")
	public ResponseEntity<Void> delete(@PathVariable String calendarName) throws Exception{
		System.out.println("delete test!!!");
		System.out.println("calendar name : " + calendarName);
		
		int calendarID = getCalendarID(calendarName);
		System.out.println("calendar id : " + calendarID);
		
		clserv.deleteMembers(calendarID);
		clserv.deleteSchedules(calendarName);
		clserv.delete(calendarName);
		
		return ResponseEntity.ok().build();
	}
	
	public int getCalendarID(String calendarName) throws Exception {
		return clserv.getCalendarID(calendarName);
	}
}
