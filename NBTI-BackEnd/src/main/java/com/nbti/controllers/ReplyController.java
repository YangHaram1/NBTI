package com.nbti.controllers;

import java.util.HashMap;
import java.util.List;
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

import com.nbti.dto.ReplyDTO;
import com.nbti.services.LikesService;
import com.nbti.services.ReplyService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/reply")
public class ReplyController {

	
	@Autowired
	private ReplyService rserv;
	@Autowired
	private LikesService lserv;
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
	
	// 댓글 및 좋아요 상태 & 개수 조회
	@GetMapping("/{board_seq}/{board_code}")
	public ResponseEntity<Map<String, Object>> selectReply(@PathVariable int board_seq, @PathVariable int board_code){
//		List<ReplyDTO> list = rserv.selectReply(board_seq, board_code);
//		return ResponseEntity.ok(list);
	 
		List<ReplyDTO> replies = rserv.selectReply(board_seq, board_code);
	    Map<Integer, Boolean> likesStatus = new HashMap<>();
	    
	    
	    String memberId = (String) session.getAttribute("loginID");
	    
	    for (ReplyDTO reply : replies) {
	        Map<String, Object> map = new HashMap<>();
	        map.put("reply_seq", reply.getSeq());
	        map.put("member_id", memberId);
	        
	        boolean isLiked = lserv.isLiked(map); // map 안의 댓글에 담긴 좋아요의 상태( true/false )가 isLiked에 담김
	        
	        likesStatus.put(reply.getSeq(), isLiked);
	        
	        int count = lserv.likeCount(reply.getSeq());
	        reply.setCount(count);
	    }

	    Map<String, Object> result = new HashMap<>();
	    result.put("replies", replies);
	    result.put("likes", likesStatus);
	    
	    return ResponseEntity.ok(result);
	
	
	}
	
	// 댓글 삭제 
	@DeleteMapping("/{seq}")
	public ResponseEntity<Integer> delete(@PathVariable int seq){
		rserv.delete(seq);
		return ResponseEntity.ok().build();
	}
	

	
}
