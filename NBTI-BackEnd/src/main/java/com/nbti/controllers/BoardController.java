package com.nbti.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	@GetMapping("/{code}/{seq}")
	public ResponseEntity<BoardDTO> selectBoard(@PathVariable int seq, @PathVariable int code){
		
		System.out.println("seq : " + seq + " / code : " + code);
		
		BoardDTO board = bserv.selectBoard(seq, code);
		
		System.out.println(board.getSeq() + ": "+ board.getTitle() + ":"+board.getMember_id() + ":");
		
		return ResponseEntity.ok(board);
	}
	
	
	
	
}
