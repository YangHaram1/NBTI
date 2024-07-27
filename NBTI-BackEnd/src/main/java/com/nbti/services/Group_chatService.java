package com.nbti.services;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nbti.dao.Group_chatDAO;

@Service
public class Group_chatService {
	
	@Autowired
	private Group_chatDAO dao;
	
	
	public int insert(String member_id) throws Exception{
		return dao.insert(member_id);
	}
	

}
