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
	
    // 목록
    public List<CalendarListDTO> list (String member_id)  throws Exception{
    	return mybatis.selectList("CalendarList.list", member_id);
    }
    
	// 입력
	public void insert (CalendarListDTO dto)  throws Exception {
		mybatis.insert("CalendarList.insert",dto);
	}
		
}
