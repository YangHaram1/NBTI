package com.nbti.controllers;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nbti.dto.LikesDTO;
import com.nbti.services.LikesService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/likes")
public class LikesController {

	@Autowired
	private LikesService lserv;
	@Autowired
	private HttpSession session;
	
	// 좋아요 추가
	@PostMapping("/insert")
	public ResponseEntity<Integer> insert(@RequestBody LikesDTO dto){
		
		String member_id = (String)session.getAttribute("loginID");
		dto.setMember_id(member_id);
		
		System.out.println("댓글 : " + dto.getReply_seq());
		int result = lserv.insert(dto);
		return ResponseEntity.ok(result);
	}
	
	
	// 좋아요 취소
	@DeleteMapping("/delete/{seq}")
	public ResponseEntity<Integer> delete(@PathVariable int seq){
		
		String member_id = (String) session.getAttribute("loginID");
		
		Map<String, Object> map = new HashMap<>();
		map.put("reply_seq", seq);
		map.put("member_id", member_id);
		
		int result = lserv.delete(map);
		return ResponseEntity.ok(result);
	}	
	
	// 좋아요 추가 되었는지
	@GetMapping("/status/{replySeq}")
    public ResponseEntity<Boolean> isLiked(@PathVariable int replySeq) {
        String member_id = (String) session.getAttribute("loginID");
        
        Map<String, Object> map = new HashMap<>();
        map.put("reply_seq", replySeq);
        map.put("member_id", member_id);
        
        boolean result = lserv.isLiked(map);
        return ResponseEntity.ok(result);
    }
	
	// 좋아요 갯수
	@GetMapping("/count/{reply_seq}")
	public ResponseEntity<Integer> likeCount(@PathVariable int reply_seq){
		
		int result = lserv.likeCount(reply_seq);
		return ResponseEntity.ok(result);
	}
	
	
}
