package com.nbti.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nbti.dto.User_historyDTO;

@Repository
public class User_histroyDAO {
	
	@Autowired
	private SqlSession mybatis;
	
	public void insert (User_historyDTO dto) throws Exception{
		
		mybatis.insert("User_history.insert",dto);
	}
}
