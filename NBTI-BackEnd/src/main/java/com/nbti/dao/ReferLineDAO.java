package com.nbti.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nbti.dto.ReferLineDTO;

@Repository
public class ReferLineDAO {
	
	@Autowired
	private SqlSession mybatis;
	
	public void insert(ReferLineDTO dto) {
		mybatis.insert("ReferLine.insert", dto);
	}
	
	
	public List<ReferLineDTO> selectLine(int seq){
		return mybatis.selectList("ReferLine.selectLine",seq);
	}
	
	
}
