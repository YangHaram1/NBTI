package com.nbti.services;

import java.io.Console;
import java.util.List;

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
    
	// 현재 등록된 캘린더 전체 목록
    public List<CalendarDTO> list () throws Exception{
    	
    	List<CalendarDTO> list = cdao.list();
    	return list;
    }
    
    //수정
    public void update (CalendarDTO dto) throws Exception {
    	cdao.update(dto);
    }
    
    //삭제 
    public void delete (int seq) {
    	cdao.delete(seq);
    }
    
//    //내 캘린더의 이름 (공유/개인)
//    public List<ScheduleTitleDTO> scheduleName() throws Exception{
//    	return cdao.scheduleName();
//    }


}
