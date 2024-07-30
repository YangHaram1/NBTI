package com.nbti.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nbti.dto.DocSubDTO;

@Repository
public class DocTypeDAO {

	@Autowired
	private SqlSession mybatis;
	
	public List<DocSubDTO> selectAll(){
		return mybatis.selectList("DocType.selectAll");
	}
	
}
