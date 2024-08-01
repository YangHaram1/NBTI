package com.nbti.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nbti.dao.BoardDAO;
import com.nbti.dto.BoardDTO;

@Service
public class BoardService {
	
	@Autowired
	private BoardDAO bdao;
	
	// 목록 출력
//	public List<BoardDTO> selectAll(int code){
//		return bdao.selectAll(code);
//	}
	public List<BoardDTO> selectAll(Map<String, Object> map){
		return bdao.selectAll(map);
	}

	// 게시글 출력
	public BoardDTO selectBoard(int seq, int code) {
//		Map<String, Integer> params = new HashMap<>();
//		params.put("seq", seq);
//		params.put("code", code);
		
		return bdao.selectBoard(new BoardDTO(seq, code));
	}
	
	// 게시글 작성
	public void insert(BoardDTO dto) {
		bdao.insert(dto);
	}


	// 게시글 삭제
	public void delete(int seq) {
		bdao.delete(seq);
	}
	
	// 게시글 수정
	public void modify(BoardDTO dto) {
		bdao.modify(dto);
	}

	// 조회수 증가
	public void updateViewCount(HashMap<String, Integer> map) {
		bdao.updateViewCount(map);
	}
	
}
