package com.nbti.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nbti.dao.CalendarDAO;
import com.nbti.dto.CalendarDTO;

@Service
public class CalendarService {
	@Autowired
	private CalendarDAO cdao;
	
	//캘린더 입력
	public void insert (CalendarDTO dto) {
		cdao.insert(dto);
	}
}
