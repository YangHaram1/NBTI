package com.nbti.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nbti.dto.CalendarDTO;

@Repository
public class CalendarDAO {
	@Autowired
	private SqlSession mybatis;
	
	//캘린더 입력
	public void insert (CalendarDTO dto)  throws Exception {
//		dto.setMember_id("test");
		System.out.println("dto seq : " + dto.getSeq());
		System.out.println("dto member id : " + dto.getMember_id());
		System.out.println("dto title : " + dto.getTitle());
		System.out.println("dto title : " + dto.getCalendarTitle());
		System.out.println("dto contents : " + dto.getContents());
		System.out.println("dto start date : " + dto.getStart_date());
		System.out.println("dto end date : " + dto.getEnd_date());
		
		mybatis.insert("Calendar.insert",dto);
		
		System.out.println("dto seq : " + dto.getSeq());
	}
//    // 캘린더 제목 업데이트
//    public void editTitle(CalendarDTO dto)  throws Exception {
//        mybatis.update("Calendar.editTitle", dto);
//    }
//
//    public void updateCalendarTitle(CalendarDTO dto)  throws Exception {
//        mybatis.update("Calendar.updateCalendarTitle", dto);
//    }
    
    //List 불러오기
    public List<CalendarDTO> list ()  throws Exception{
    	return mybatis.selectList("Calendar.list");
    }

}
