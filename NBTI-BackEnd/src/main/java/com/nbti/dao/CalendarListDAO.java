package com.nbti.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nbti.dto.CalendarListDTO;

@Repository
public class CalendarListDAO {
	@Autowired
	private SqlSession mybatis;
	
	public void insert (CalendarListDTO dto) throws Exception{
		System.out.println(dto.getSeq());
		System.out.println(dto.getName());
		System.out.println(dto.getType());
		mybatis.insert("CalendarList.insert",dto);
	}
	
    // 목록
    public List<CalendarListDTO> list ()  throws Exception{
    	return mybatis.selectList("CalendarList.list");
    }
}
