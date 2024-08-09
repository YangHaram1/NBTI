package com.nbti.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nbti.dto.ReplyDTO;

@Repository
public class ReplyDAO {

	@Autowired
	private SqlSession mybatis;
	
	// 댓글 입력
	public ReplyDTO insert(ReplyDTO dto) {
		mybatis.insert("Reply.insert",dto);
		dto.setWrite_date(mybatis.selectOne("Reply.write_date",dto.getSeq()));
		return dto;
	}
	
	// 댓글 출력
	public List<ReplyDTO> selectReply(Map<String, Integer> map){
		return mybatis.selectList("Reply.selectReply", map);
	}
	
	// 댓글 개수
	public int countReply(Map<String, Integer> map){
		return mybatis.selectOne("Reply.countReply", map);
	}
	
	// 댓글 삭제
	public int delete(int seq) {
		return mybatis.delete("Reply.delete", seq);
	}
	
	//============================[ 메 인 ]=============================
	// 자유게시판 댓글 출력
	public List<ReplyDTO> selectFreeReply(int seq){
		return mybatis.selectList("Reply.selectFreeReply", seq);
	}
	
	
	
}
