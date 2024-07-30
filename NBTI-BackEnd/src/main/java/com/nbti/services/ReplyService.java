package com.nbti.services;

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
	
	
	
	
}
