package com.nbti.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class User_histroyDAO {
	
	@Autowired
	private SqlSession mybatis;
	
	public void insert () throws Exception{
		
	}
}
