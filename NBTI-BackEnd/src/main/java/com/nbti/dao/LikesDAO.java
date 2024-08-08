package com.nbti.dao;

import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nbti.dto.LikesDTO;

@Repository
public class LikesDAO {

	@Autowired
	private SqlSession mybatis;
	
	// 좋아요 추가
	public int insert(LikesDTO dto) {
		return mybatis.insert("Likes.insert",dto);
	}
	
	// 좋아요 취소
	public int delete(Map<String, Object> map) {
		return mybatis.delete("Likes.delete", map);
	}
}
