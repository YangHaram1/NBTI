package com.nbti.services;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nbti.dao.TempBoardDAO;
import com.nbti.dto.BoardDTO;
import com.nbti.dto.TempBoardDTO;

@Service
public class TempBoardService {

	
	@Autowired
	private TempBoardDAO tdao;
	
	// 임시저장
	public int insert(BoardDTO dto) {
		return tdao.insert(dto);
	}
	
	// 임시저장 목록 출력
	public List<TempBoardDTO> selectAll(Map<String, Object> map){
		return tdao.selectAll(map);
	}
//	public List<TempBoardDTO> selectAll(Map<String, Object> map){
//		return tdao.selectAll(map);
//	}
	
	// 임시저장 삭제
	public int delete(int seq) {
		return tdao.delete(seq);
	}
	
	// 임시저장 수정 (작성된 글 불러오기)
	public TempBoardDTO modify(int seq) {
		return tdao.modify(seq);
	}
	
	
}
