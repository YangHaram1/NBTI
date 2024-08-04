package com.nbti.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
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
	@PostMapping
	public ResponseEntity<ReplyDTO> insert(@RequestBody ReplyDTO dto) {
		if(dto.getContents().equals("")) {
			return ResponseEntity.ok(null);
		}
		else {
			String member_id = (String) session.getAttribute("loginID");
			dto.setMember_id(member_id);
			
			return ResponseEntity.ok(rserv.insert(dto));
		}
	}
	
	// 댓글 출력
	@GetMapping("/{board_seq}/{board_code}")
	public ResponseEntity<List<ReplyDTO>> selectReply(@PathVariable int board_seq, @PathVariable int board_code){
		List<ReplyDTO> list = rserv.selectReply(board_seq, board_code);
		return ResponseEntity.ok(list);
	}
	
	// 댓글 삭제 
	@DeleteMapping("/{seq}")
	public ResponseEntity<Integer> delete(@PathVariable int seq){
		rserv.delete(seq);
		return ResponseEntity.ok().build();
	}
	

	
}
