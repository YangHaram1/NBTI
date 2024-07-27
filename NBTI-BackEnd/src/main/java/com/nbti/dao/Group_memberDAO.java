package com.nbti.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nbti.dto.Group_memberDTO;

@Repository
public class Group_memberDAO {
	@Autowired
	private SqlSession mybatis;
	
	public void insert(Group_memberDTO dto) throws Exception {
		mybatis.insert("Group_member.insert",dto);
	}
}
