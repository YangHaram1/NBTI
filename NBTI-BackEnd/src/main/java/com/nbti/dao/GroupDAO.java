package com.nbti.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nbti.dto.DepartmentDTO;
import com.nbti.dto.GroupDTO;
import com.nbti.dto.TeamsDTO;

@Repository
public class GroupDAO {
	@Autowired
	private SqlSession mybatis;
	
	public List<TeamsDTO> getTeamByDeftCode(String dept_code) throws Exception{
		return mybatis.selectList("Group.getTeamByDeftCode",dept_code);
	}
	
	public List<DepartmentDTO> getDepartmentAll() throws Exception{
		return mybatis.selectList("Group.getDepartmentAll");
	}
	
	public List<GroupDTO> getMemberByTeamcode(String team_code) throws Exception{
		return mybatis.selectList("Group.getMemberByTeamcode",team_code);
	}
}
