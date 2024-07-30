package com.nbti.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nbti.dto.ReplyDTO;
import com.nbti.services.ReplyService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/reply")
public class ReplyController {

	
	@Autowired
	private ReplyService rserv;
	@Autowired
	private HttpSession session;
	
	
	// 댓글 입력
//	@PostMapping("{boardSeq}/{code}")
//	public ResponseEntity<Void> insert(@PathVariable int boardSeq, @PathVariable int code, @RequestBody ReplyDTO dto) {
//	String member_id = (String) session.getAttribute("loginID");
//
//	System.out.println("멤버 아이디 : " + member_id); // 잘 나옴
//	System.out.println("댓글 내용 : " + dto.getContents()); // 잘 나옴
//	System.out.println("작성 시간 : " + dto.getWrite_date()); // null
//	
//	dto.setMember_id(member_id);
//	dto.setBoard_seq(boardSeq);
//	dto.setBoard_code(code);
//	
//	
////	System.out.println(boardSeq + " : " + code);
//	
//	rserv.insert(dto);
//		return ResponseEntity.ok().build();
//	}
	
	@PostMapping
	public ResponseEntity<ReplyDTO> insert(@RequestBody ReplyDTO dto) {
	String member_id = (String) session.getAttribute("loginID");
	dto.setMember_id(member_id);
	System.out.println("멤버 아이디 : " + dto.getMember_id()); // 잘 나옴
	System.out.println("댓글 내용 : " + dto.getContents()); // 잘 나옴
	System.out.println("작성 시간 : " + dto.getWrite_date()); // null
	
	
		return ResponseEntity.ok(rserv.insert(dto));
	}
	
	
	
	
	
}
