package com.nbti.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nbti.dao.BoardDAO;
import com.nbti.dto.BoardDTO;

@Service
public class BoardService {
	
	@Autowired
	private BoardDAO bdao;
	
	// 목록 출력
	public List<BoardDTO> selectAll(int code){
		return bdao.selectAll(code);
	}

	// 게시글 출력
	public BoardDTO selectBoard(int seq, int code) {
		return bdao.selectBoard(seq, code);
	}
}
