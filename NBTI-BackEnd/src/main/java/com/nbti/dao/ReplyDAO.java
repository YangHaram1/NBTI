package com.nbti.dao;

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
	
}
