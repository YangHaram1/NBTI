package com.nbti.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nbti.dto.Chat_uploadDTO;

@Repository
public class Chat_uploadDAO {
	@Autowired
	private SqlSession mybatis;
	
	public int insert(Chat_uploadDTO dto) throws Exception{
		return mybatis.insert("Chat_upload.insert",dto);
	}
	
}
