package com.nbti.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nbti.dto.DocLeaveDTO;

@Repository
public class DocLeaveDAO {
	
	@Autowired
	private SqlSession mybatis;
	
	public void insert(DocLeaveDTO dldto) {
		mybatis.insert("DocLeave.insert", dldto);
	}
	
	public DocLeaveDTO getContent(int seq) {
		return mybatis.selectOne("DocLeave.selectContent",seq);
	}
	
	public void delete(int seq) {
		mybatis.delete("DocLeave.delete",seq);
	}

}
