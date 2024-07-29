package com.nbti.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nbti.dao.CalendarDAO;
import com.nbti.dto.CalendarDTO;
import com.nbti.dto.scheduleTitleDTO;

@Service
public class CalendarService {
	@Autowired
	private CalendarDAO cdao;
	
	//캘린더 입력
	public void insert (CalendarDTO dto) {
		cdao.insert(dto);
	}
	
//	// 캘린더 제목 업데이트
//	public void edit(CalendarDTO dto) {
//		cdao.edit(dto);
//	}
	
//    public void edit(CalendarDTO calendarDTO, scheduleTitleDTO scheduleTitleDTO) {
//        // 캘린더 제목 수정
//        cdao.updateCalendar(calendarDTO);
//
//        // 일정 제목 수정
//        cdao.updateScheduleTitle(scheduleTitleDTO);
//    }

}
