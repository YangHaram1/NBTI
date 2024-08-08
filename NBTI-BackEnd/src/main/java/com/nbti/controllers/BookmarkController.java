package com.nbti.controllers;

import java.util.HashMap;
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

import com.nbti.dto.BookmarkDTO;
import com.nbti.services.BookmarkService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/bookmark")
public class BookmarkController {

	@Autowired
	private BookmarkService bserv;
	@Autowired
	private HttpSession session;
	
	
	// 북마크 추가
	@PostMapping("/insert")
	public ResponseEntity<Integer> insert(@RequestBody BookmarkDTO dto) {
		String member_id = (String) session.getAttribute("loginID");
		dto.setMember_id(member_id);

		int result = bserv.insert(dto);
		return ResponseEntity.ok(result);
	}
	
	// 북마크 삭제
	@DeleteMapping("/delete/{seq}")
	public ResponseEntity<Integer> delete(@PathVariable int seq){
		
		System.out.println("seq : " + seq); // 게시물 seq번호임 
		
		String member_id = (String) session.getAttribute("loginID");
		
		Map<String, Object> map = new HashMap<>();
		map.put("board_seq", seq);
		map.put("member_id", member_id);
		
		
		int result = bserv.delete(map);
		return ResponseEntity.ok(result);
	}
	
	// 게시글이 북마크 되었는지
	@GetMapping("{boardSeq}")
	public ResponseEntity<Boolean> isBookmarkStatus (@PathVariable int boardSeq) {
		
		String member_id = (String) session.getAttribute("loginID");
		
		Map<String, Object> map = new HashMap<>();
		map.put("boardSeq", boardSeq);
		map.put("member_id", member_id);
		
		
		Boolean result = bserv.isBookmarkStatus(map);
		return ResponseEntity.ok(result);
	}
	
	
}
