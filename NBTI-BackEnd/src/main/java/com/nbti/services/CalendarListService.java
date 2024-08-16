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
	
	// 공유 캘린더 목록
    public List<CalendarListDTO> list (String member_id) throws Exception{
    	List<CalendarListDTO> list = cldao.list(member_id);
    	return list;
    }
    
	// 공유 캘린더 추가
	public void insert (CalendarListDTO dto)  throws Exception {
		cldao.insert(dto);
	}
	
	public int getLastCalendarID() throws Exception {
		return cldao.getLastCalendarID();
	}

	public void insertMember(int lastCalID, String calendarMember) throws Exception {
		cldao.insertMember(lastCalID, calendarMember);
	}
	
	//삭제
	public void delete (String calendar_name) throws Exception{
		cldao.delete(calendar_name);
	}
	
	public int getCalendarID(String calendarName) throws Exception {
		System.out.println("calendarName : " + calendarName);
		return cldao.getCalendarID(calendarName);
	}
	
	public void deleteMembers(int calendarID) throws Exception {
		cldao.deleteMembers(calendarID);
	}
	
	public void deleteSchedules(String calendarName) throws Exception {
		cldao.deleteSchedules(calendarName);
	}
}
