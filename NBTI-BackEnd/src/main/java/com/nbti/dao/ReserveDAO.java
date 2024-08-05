package com.nbti.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nbti.dto.ReserveDTO;

@Repository
public class ReserveDAO {
	@Autowired
	private SqlSession mybatis;
	
	public void insert (ReserveDTO dto) throws Exception{
		mybatis.insert("Reserve.insert",dto);
	}
	
	public List<ReserveDTO> waitingList () throws Exception{
		return mybatis.selectList("Reserve.waitingList");
	}
}
