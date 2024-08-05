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
	public List<BoardDTO> selectAll(Map<String, Object> map) {
		return mybatis.selectList("Board.selectAll",map);
	}
	
	// 게시글 총 개수 (페이지네이션)
	public int getBoardCount(Map<String, Object> map) {
		return mybatis.selectOne("Board.getBoardCount", map);
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
	public void updateViewCount(HashMap<String, Integer> map) {
		mybatis.update("Board.updateViewCount", map);
	}

	// 내 글 목록
	public List<BoardDTO> selectMyList(Map<String, Object> map) {
		return mybatis.selectList("Board.selectMyList",map);
	}
	
	
	
	//============================[ 메 인 ]=============================
	// 공지 게시판 출력
	public List<BoardDTO> selectNotice() {
		return mybatis.selectList("Board.selectNotice");
	}
	
	// 자유 게시판 출력
	public List<BoardDTO> selectFree() {
		return mybatis.selectList("Board.selectFree");
	}
	
	
	
	
	
}
