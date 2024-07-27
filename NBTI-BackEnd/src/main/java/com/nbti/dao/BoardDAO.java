package com.nbti.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nbti.dto.BoardDTO;

@Repository
public class BoardDAO {

	@Autowired
	private SqlSession mybatis;
	
	// 목록 출력
	public List<BoardDTO> selectAll(int code) {
		return mybatis.selectList("Board.selectAll",code);
	}
	
	// 게시글 출력
	public BoardDTO selectBoard(int seq, int code) {
		
		Map<String, Object> params = new HashMap<>();
		params.put("seq", seq);
		params.put("code", code);

		return mybatis.selectOne("Board.selectBoard", params);
	}
}
