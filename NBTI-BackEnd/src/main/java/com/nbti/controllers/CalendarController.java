package com.nbti.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
    public ResponseEntity<Void> insert(@RequestBody CalendarDTO dto) throws Exception{
        //System.out.println(dto.getSeq() + " seq");
        dto.setMember_id((String) session.getAttribute("loginID"));
        cserv.insert(dto);
        return ResponseEntity.ok().build();
    }
    
    // 내 캘린더 제목 변경
//    @PutMapping("/title")
//    public ResponseEntity<Void> editTitle(@RequestBody CalendarDTO dto) throws Exception {
//        dto.setMember_id((String) session.getAttribute("loginID")); 
//        cserv.editTitle(dto); 
//        return ResponseEntity.ok().build();
//    }

    @GetMapping
    public ResponseEntity<List<CalendarDTO>> list () throws Exception {
    	List<CalendarDTO> list = cserv.list();
    	return ResponseEntity.ok(list);
    }


    
    
    
    
    
    
    
	@ExceptionHandler(Exception.class)
	public String exceptionHandler(Exception e) {
		e.printStackTrace();
		return "error";
	}
    
}
