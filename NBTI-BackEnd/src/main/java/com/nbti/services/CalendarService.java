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
	public void insert (CalendarDTO dto)  throws Exception {
		cdao.insert(dto);
	}

	// 캘린더 제목 수정
    public void editTitle(CalendarDTO dto)  throws Exception {
        cdao.editTitle(dto); 
    }

    // 캘린더 제목 업데이트 (Optional)
    public void updateCalendarTitle(CalendarDTO dto)  throws Exception {
        cdao.updateCalendarTitle(dto); 
    }


}
