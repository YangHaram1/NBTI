package com.nbti.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nbti.dao.CalendarListDAO;
import com.nbti.dto.CalendarListDTO;

@Service
public class CalendarListService {
	@Autowired
	private CalendarListDAO cldao;
	
	// 목록
    public List<CalendarListDTO> list (String member_id) throws Exception{
    	
    	List<CalendarListDTO> list = cldao.list(member_id);
    	return list;
    }
    
	// 입력
	public void insert (CalendarListDTO dto)  throws Exception {
		cldao.insert(dto);
	}
}
