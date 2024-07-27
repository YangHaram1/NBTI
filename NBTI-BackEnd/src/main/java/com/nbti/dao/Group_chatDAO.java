package com.nbti.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nbti.dto.Group_chatDTO;

@Repository
public class Group_chatDAO {
	@Autowired
	private SqlSession mybatis;
	
	public int insert(String member_id ) throws Exception{
		Group_chatDTO dto =new Group_chatDTO();
		dto.setName(member_id);
		mybatis.insert("Group_chat.insert",dto);
		return dto.getSeq();
	}
}
