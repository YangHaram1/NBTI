package com.nbti.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nbti.dto.DepartmentDTO;

@Repository
public class DepartmentDAO {
	
	@Autowired
	private SqlSession mybatis;
	
	public List<DepartmentDTO> selectDepartment(){
		return mybatis.selectList("Department.selectDepartment");
	}
	
}
