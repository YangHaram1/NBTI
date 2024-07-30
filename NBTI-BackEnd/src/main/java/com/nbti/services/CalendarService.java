package com.nbti.services;

import java.util.List;

import org.apache.catalina.Contained;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nbti.dao.CalendarDAO;
import com.nbti.dto.CalendarDTO;

@Service
public class CalendarService {
	@Autowired
	private CalendarDAO cdao;
	
	//캘린더 입력
	public void insert (CalendarDTO dto)  throws Exception {
		cdao.insert(dto);
	}

//	// 캘린더 제목 수정
//    public void editTitle(CalendarDTO dto)  throws Exception {
//        cdao.editTitle(dto); 
//    }
//
//    // 캘린더 제목 업데이트 (Optional)
//    public void updateCalendarTitle(CalendarDTO dto)  throws Exception {
//        cdao.updateCalendarTitle(dto); 
//    }
    
    //List 불러오기
    public List<CalendarDTO> list () throws Exception{
    	
    	List<CalendarDTO> list = cdao.list();
    	for(CalendarDTO dto: list) {
    		System.out.println(dto.getSeq());
    	}
    	return list;
    }


}
