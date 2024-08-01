package com.nbti.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nbti.dao.CalendarListDAO;
import com.nbti.dto.CalendarListDTO;

@Service
public class CalendarListService {
	@Autowired
	private CalendarListDAO cdao;
	
	
	public void insert (CalendarListDTO dto) throws Exception{
		cdao.insert(dto);
	}
	
	// 목록
    public List<CalendarListDTO> list () throws Exception{
    	
    	List<CalendarListDTO> list = cdao.list();
    	return list;
    }
}
