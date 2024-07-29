package com.nbti.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nbti.dto.JobDTO;

@Repository
public class JobDAO {
	@Autowired
	private SqlSession mybatis;
	
	public List<JobDTO> selectJob(){
		return mybatis.selectList("Job.selectJob");
	}
}
