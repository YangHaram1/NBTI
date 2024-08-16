package com.nbti.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nbti.dto.CalendarDTO;
import com.nbti.services.CalendarService;

import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/calendar")
public class CalendarController {
	@Autowired
	private CalendarService cserv;
	@Autowired
	private HttpSession session;


    // 입력
    @PostMapping
    public ResponseEntity<Void> insert(@RequestBody CalendarDTO dto) throws Exception{
        dto.setMember_id((String)session.getAttribute("loginID"));
        cserv.insert(dto);
        System.out.println(dto.getMember_id());
        System.out.println(dto.getContents());
        System.out.println(dto.getSeq());
        System.out.println(dto.getCalendar_name());
        return ResponseEntity.ok().build();
    }

    // 목록
    @GetMapping
    public ResponseEntity<List<CalendarDTO>> list () throws Exception {
    	String member_id = (String) session.getAttribute("loginID");
    	List<CalendarDTO> list = cserv.list(member_id);
    	return ResponseEntity.ok(list);
    }
    
    // 수정
    @PutMapping
    public ResponseEntity<Void> update (@RequestBody CalendarDTO dto) throws Exception{
    	System.out.println("update : " + dto.getSeq());
    	System.out.println("update : " + dto.getTitle());
    	System.out.println("update : " + dto.getContents());
    	cserv.update(dto);
    	return ResponseEntity.ok().build();
    }
    
    // 삭제
    @DeleteMapping("/{seq}")
    public ResponseEntity<Void> delete (@PathVariable int seq){
    	cserv.delete(seq);
    	return ResponseEntity.ok().build();
    }

	@ExceptionHandler(Exception.class)
	public String exceptionHandler(Exception e) {
		e.printStackTrace();
		return "error";
	}
    
}
