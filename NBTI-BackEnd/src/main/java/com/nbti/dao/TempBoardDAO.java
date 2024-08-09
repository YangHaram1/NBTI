package com.nbti.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nbti.dto.BoardDTO;
import com.nbti.dto.TempBoardDTO;

@Repository
public class TempBoardDAO {

	@Autowired
	private SqlSession mybatis;
	
	// 임시저장
	public int insert(BoardDTO dto) {
		return mybatis.insert("TempBoard.insert", dto);
	}
	
	// 임시저장 목록 출력
	public List<TempBoardDTO> selectAll(Map<String, Object> map){
		return mybatis.selectList("TempBoard.selectAll", map);
	}
	
	// 임시저장 삭제
	public int delete(int seq) {
		return mybatis.delete("TempBoard.delete", seq);
	}
	
	// 임시저장 수정 (작성된 글 불러오기)
	public TempBoardDTO modify(int seq) {
		return mybatis.selectOne("TempBoard.modify", seq);
	}
	
	
	
	
	
}
