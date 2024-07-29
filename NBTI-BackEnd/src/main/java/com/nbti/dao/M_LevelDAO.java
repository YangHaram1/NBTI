package com.nbti.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nbti.dto.M_LevelDTO;

@Repository
public class M_LevelDAO {
	
	@Autowired
	private SqlSession mybatis;
	
	public List<M_LevelDTO> selectLevel(){
		return mybatis.selectList("M_Level.selectM_Level");
	}
	
}
