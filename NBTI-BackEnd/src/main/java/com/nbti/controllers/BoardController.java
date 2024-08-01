package com.nbti.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nbti.dto.BoardDTO;
import com.nbti.services.BoardService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/board")
public class BoardController {

	@Autowired
	private BoardService bserv;
	@Autowired
	private HttpSession session;
	
	
	// 목록 출력
	@GetMapping("/{code}")
	public ResponseEntity<List<BoardDTO>> selectAll(@PathVariable int code){
		System.out.println("게시판 코드 : " + code);
		List<BoardDTO> list = bserv.selectAll(code);
		return ResponseEntity.ok(list);

	}
	
	// 게시글 출력
	@GetMapping("/{boardSeq}/{code}")
	public ResponseEntity<BoardDTO> selectBoard(@PathVariable int boardSeq, @PathVariable int code){
		BoardDTO dto = bserv.selectBoard(boardSeq, code);		
		return ResponseEntity.ok(dto);
	}
	
	// 게시글 작성
	@PostMapping
	public ResponseEntity<Void> insert(@RequestBody BoardDTO dto) {
	String member_id = (String) session.getAttribute("loginID");
	dto.setMember_id(member_id);
	bserv.insert(dto);
		return ResponseEntity.ok().build();
	}
	
	// 게시글 삭제
	@DeleteMapping("/{seq}")
	public ResponseEntity<Void> delete(@PathVariable int seq){
		bserv.delete(seq);
		return ResponseEntity.ok().build();
	}
	
	
	// 게시글 수정
	@PutMapping
	public ResponseEntity<Void> modify(@RequestBody BoardDTO dto){
		System.out.println("수정 : " +dto.getSeq() + " : " + dto.getTitle() + " : " + dto.getContents());
		bserv.modify(dto); 
		return ResponseEntity.ok().build();
	}
	
	/*
	// 조회수 증가
//	@PutMapping
//	public ResponseEntity<Void> updateViewCount(@RequestBody BoardDTO dto) {
//		
//		System.out.println("seq : "+ dto.getSeq());
//		System.out.println("boardCode : "+ dto.getBoard_code());
//		
//		
////		bserv.updateViewCount(dto);
//		return ResponseEntity.ok().build();
//	}
	
	*/
	
	
	
	
	
	
	
	
	
}
