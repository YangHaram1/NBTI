package com.nbti.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nbti.dto.BoardDTO;
import com.nbti.dto.ReplyDTO;
import com.nbti.services.BoardService;
import com.nbti.services.ReplyService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/board")
public class BoardController {

	@Autowired
	private BoardService bserv;
	@Autowired
	private HttpSession session;
	
	
	// 목록 출력
	@GetMapping("/list")
	public ResponseEntity<Map<String, Object>> selectAll(
			@RequestParam int code,
	        @RequestParam(required = false) String target,
	        @RequestParam(required = false) String keyword,
	        @RequestParam int start,
	        @RequestParam int end){
		
		Map<String, Object> map = new HashMap<>();
	    map.put("board_code", code);
	    map.put("target", target);
	    map.put("keyword", keyword);
	    map.put("start", start);
	    map.put("end", end);
	    
	    List<BoardDTO> list = bserv.selectAll(map);
	    
	    // 클라이언트에게 보낼 값 ( 페이지네이션 : 게시글 총 개수, 게시글 목록 )
	    Map<String, Object> result = new HashMap<>();
	    result.put("count", bserv.getBoardCount(map) );
	    result.put("list", list );
	    
		return ResponseEntity.ok(result);
	}
	
	
	// 내 글 목록
	@GetMapping("/myList")
	public ResponseEntity<Map<String, Object>> selectMyList(
			@RequestParam int code,
	        @RequestParam(required = false) String target,
	        @RequestParam(required = false) String keyword,
	        @RequestParam int start,
	        @RequestParam int end){
		
		String member_id = (String) session.getAttribute("loginID");
		
		Map<String, Object> map = new HashMap<>();
	    map.put("board_code", code);
	    map.put("target", target);
	    map.put("keyword", keyword);
	    map.put("start", start);
	    map.put("end", end);
	    map.put("member_id", member_id);
	    
	    List<BoardDTO> list = bserv.selectMyList(map);
	    
	    // 클라이언트에게 보낼 값 ( 페이지네이션 : 게시글 총 개수, 게시글 목록 )
	    Map<String, Object> result = new HashMap<>();
	    result.put("count", bserv.getMyListCount(map) ); // 전체 게시글 수 계산
	    result.put("list", list );
	    
		return ResponseEntity.ok(result);
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
		bserv.modify(dto); 
		return ResponseEntity.ok().build();
	}
	

	// 조회수 증가
	@PutMapping("/viewCount")
	public ResponseEntity<Void> updateViewCount(@RequestBody Map<String, Integer> request) {
		
		int seq = request.get("seq");
		int board_code = request.get("board_code");
		
		HashMap<String, Integer> map = new HashMap<>();
		map.put("seq", seq);
		map.put("board_code", board_code);
		
		bserv.updateViewCount(map);
		return ResponseEntity.ok().build();
	}
	
	// 중요(북마크) 게시글 출력
	@GetMapping("/bookmarkList")
	public ResponseEntity<Map<String, Object>> bookmarkList(
			@RequestParam int code,
	        @RequestParam(required = false) String target,
	        @RequestParam(required = false) String keyword,
	        @RequestParam int start,
	        @RequestParam int end){
		
		String member_id = (String) session.getAttribute("loginID");
		Map<String, Object> map = new HashMap<>();
	    map.put("board_code", code);
	    map.put("target", target);
	    map.put("keyword", keyword);
	    map.put("start", start);
	    map.put("end", end);
	    map.put("member_id", member_id);
	    
	    List<BoardDTO> list = bserv.bookmarkList(map);
		
	 // 클라이언트에게 보낼 값 ( 페이지네이션 : 게시글 총 개수, 게시글 목록 )
	    Map<String, Object> result = new HashMap<>();
	    result.put("count", bserv.getMyListCount(map) ); // 전체 게시글 수 계산
	    result.put("list", list );
	    
		return ResponseEntity.ok(result);
	}
	
	


	//============================[ 메 인 ]=============================
	// 공지 게시판 출력
	@GetMapping("/noticeBoard")
	public ResponseEntity<List<BoardDTO>> selectNotice(){
		List<BoardDTO> list = bserv.selectNotice();
		return ResponseEntity.ok(list);
	}

	
	@GetMapping("/freeBoard")
	public ResponseEntity<Map<String, Object>> selectFree(){
		Map<String, Object> list = bserv.selectFree();
		return ResponseEntity.ok(list);
	}
	
	
	
	
	
	
	
	
}
