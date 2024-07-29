package com.nbti.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nbti.dto.CalendarDTO;
import com.nbti.dto.scheduleTitleDTO;
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
    
    //내 캘린더 이름 변경
//    @PutMapping
//    public ResponseEntity<Void> edit(@RequestBody CalendarDTO dto) {
//        dto.setMember_id((String) session.getAttribute("loginID"));
//        cserv.edit(dto);
//        return ResponseEntity.ok().build();
//    }
    
//    @PutMapping
//    public ResponseEntity<Void> edit(@RequestBody Map<String, Object> dtoMap) {
//        CalendarDTO calendarDTO = (CalendarDTO) dtoMap.get("calendarDTO");
//        scheduleTitleDTO scheduleTitleDTO = (scheduleTitleDTO) dtoMap.get("scheduleTitleDTO");
//
//        System.out.println(calendarDTO.getTitle() + " 캘린더 이름 변경 title");
//        
//        // 세션에서 로그인 ID 가져오기
//        calendarDTO.setMember_id((String) session.getAttribute("loginID"));
//        
//        // 서비스에서 수정 처리
//        cserv.edit(calendarDTO, scheduleTitleDTO);
//        
//        return ResponseEntity.ok().build();
//    }



    
    
    
    
    
    
    
    
    
}
