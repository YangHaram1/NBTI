package com.nbti.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nbti.dto.ApprovalLineDTO;

@Repository
public class ApprovalLineDAO {
	
	@Autowired
	private SqlSession mybatis;
	
	public void insert(ApprovalLineDTO dto) {
		mybatis.insert("ApprovalLine.insert", dto);
	}
	
	public List<ApprovalLineDTO> selectLine(int seq){
		return mybatis.selectList("ApprovalLine.selectLine",seq);
	}

}
