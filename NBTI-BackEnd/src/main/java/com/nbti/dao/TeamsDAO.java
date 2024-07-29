package com.nbti.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nbti.dto.TeamsDTO;

@Repository
public class TeamsDAO {
	@Autowired
	private SqlSession mybatis;
	
	public List<TeamsDTO> selectTeams(){
		return mybatis.selectList("Teams.selectTeams");
	}
}
