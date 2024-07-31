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
	public BoardDTO selectBoard(BoardDTO dto) {
		return mybatis.selectOne("Board.selectBoard", dto);
	}
	
	// 게시글 작성
	public void insert(BoardDTO dto) {
		mybatis.insert("Board.insert",dto);
	}
	
	// 게시글 삭제
	public void delete(int seq) {
		mybatis.delete("Board.delete", seq);
	}
	
	// 게시글 수정
	public void modify(BoardDTO dto) {		
		mybatis.update("Board.modify",dto);
	}
	
	// 조회수 증가
	public void updateViewCount(int code) {
		mybatis.update("Board.update", code);
	}
	
	
}
