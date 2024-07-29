package com.nbti.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
		
		System.out.println("seq : " + boardSeq + " / code : " + code);
		
		BoardDTO dto = bserv.selectBoard(boardSeq, code);
		
		System.out.println(dto.getSeq() + ": "+ dto.getTitle() + ":"+dto.getMember_id() + ":");
		
		return ResponseEntity.ok(dto);
	}
	
	// 게시글 작성
	@PostMapping
	public ResponseEntity<Void> insert(@RequestParam BoardDTO dto) {
		bserv.insert(dto);
		return ResponseEntity.ok().build();
	}
	
	// 게시글 삭제
	@DeleteMapping("/{seq}")
	public ResponseEntity<Void> delete(@PathVariable int seq){
		System.out.println("aaa : " + seq);
		bserv.delete(seq);
		return ResponseEntity.ok().build();
	}
	
	
	// 게시글 수정
	@PutMapping
	public ResponseEntity<Void> modify(@RequestParam BoardDTO dto){
//		String id = (String) session.getAttribute("loginID");
		
		bserv.modify(dto);
		return ResponseEntity.ok().build();
	}
	
	
	
}
