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
		
		Map<String, Integer> params = new HashMap<>();
		params.put("board_seq", board_seq);
		params.put("board_code", board_code);
		
		return rdao.selectReply(params);
	}
	
	
}
