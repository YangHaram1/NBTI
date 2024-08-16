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
	
	public class CalendarMember{
		int id;
		String member;
	}
	
    // 공유 캘린더 목록
    public List<CalendarListDTO> list (String member_id)  throws Exception{
//    	System.out.println("Member ID: " + member_id); 
    	return mybatis.selectList("CalendarList.list", member_id);
    }
    
	// 공유 캘린더 추가
	public void insert (CalendarListDTO dto)  throws Exception {
		mybatis.insert("CalendarList.insert",dto);
//		System.out.println("after : " + dto.getCalendar_id());
	}
	
	public int getLastCalendarID() throws Exception {
		return mybatis.selectOne("CalendarList.getLastCalendarID", null);
	}
	
	public void insertMember (int lastCalID, String calendarMember) throws Exception {
		CalendarMember cm = new CalendarMember();
		cm.id = lastCalID;
		cm.member = calendarMember;
		mybatis.insert("CalendarList.insertMember", cm);
	}
	
	//삭제
	public void delete (String calendar_name) throws Exception{
		mybatis.delete("CalendarList.delete", calendar_name);
	}
	
	public int getCalendarID(String calendarName) throws Exception {
		return mybatis.selectOne("CalendarList.getCalendarID", calendarName);
	}
	
	public void deleteMembers(int calendarID) throws Exception {
		mybatis.delete("CalendarList.deleteMembers", calendarID);
	}
	
	public void deleteSchedules(String calendarName) throws Exception {
		mybatis.delete("CalendarList.deleteSchedules", calendarName);
	}
}
