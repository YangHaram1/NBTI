package com.nbti.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nbti.dao.ReplyDAO;
import com.nbti.dto.ReplyDTO;

@Service
public class ReplyService {

	@Autowired
	private ReplyDAO rdao;
	
	// 댓글 입력
	public ReplyDTO insert(ReplyDTO dto) {
		return rdao.insert(dto);
	}
	
	// 댓글 출력
	public List<ReplyDTO> selectReply(int board_seq, int board_code){
		
		Map<String, Integer> map = new HashMap<>();
		map.put("board_seq", board_seq);
		map.put("board_code", board_code);
		
		return rdao.selectReply(map);
	}
	
	// 댓글 개수 조회
	public int countReply(int board_seq, int board_code){
	    Map<String, Integer> map = new HashMap<>();
	    map.put("board_seq", board_seq);
	    map.put("board_code", board_code);
	    
	    return rdao.countReply(map);
	}
	
	
	// 댓글 삭제
	public int delete(int seq) {
		return rdao.delete(seq);
	}
	
	//============================[ 메 인 ]=============================
	// 자유게시판 댓글 출력
	public List<ReplyDTO> selectFreeReply(int seq){

		return rdao.selectFreeReply(seq);
	}
	
	
}
