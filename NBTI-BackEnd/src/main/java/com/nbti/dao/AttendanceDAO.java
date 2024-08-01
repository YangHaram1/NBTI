package com.nbti.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nbti.dto.AttendanceDTO;

@Repository
public class AttendanceDAO {
	
	@Autowired
	private SqlSession mybatis;
	
	public void insert (AttendanceDTO dto) {
		System.out.println("aadfasdf");
		mybatis.insert("Attendance.insert",dto);
	}

	
}
