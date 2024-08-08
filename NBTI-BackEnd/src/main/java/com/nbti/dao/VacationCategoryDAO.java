package com.nbti.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class VacationCategoryDAO {
	
	@Autowired
	private SqlSession mybatis;
	
	public String selectCategoryName(int category) {
		return mybatis.selectOne("VacationCategory.selectName", category);
	}
}
