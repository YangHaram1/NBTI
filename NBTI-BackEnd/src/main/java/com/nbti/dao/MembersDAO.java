package com.nbti.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nbti.dto.MembersDTO;

@Repository
public class MembersDAO {
	
	@Autowired
	private SqlSession mybatis;
	
	public boolean login(MembersDTO dto) {
		String result =mybatis.selectOne("Member.login",dto);
		System.out.println(result);
		if(result!=null) {
			return true;
		}
		return false;
	}
	

}
