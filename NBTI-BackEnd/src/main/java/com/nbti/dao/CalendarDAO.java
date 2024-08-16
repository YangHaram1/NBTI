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
	
	// 입력
	public void insert (CalendarDTO dto)  throws Exception {
		//dto.setMember_id("test");
		System.out.println("dto seq : " + dto.getSeq());
		System.out.println("dto member id : " + dto.getMember_id());
		System.out.println("dto title : " + dto.getCalendar_name());
		System.out.println("dto title : " + dto.getTitle());
		System.out.println("dto contents : " + dto.getContents());
		System.out.println("dto start date : " + dto.getStart_date());
		System.out.println("dto end date : " + dto.getEnd_date());
		
		mybatis.insert("Calendar.insert",dto);
		
		System.out.println("dto seq : " + dto.getSeq());
	}
    
    // 목록
    public List<CalendarDTO> list (String memberId)  throws Exception{
    	return mybatis.selectList("Calendar.list", memberId);
    }
    
    // 수정
    public void update (CalendarDTO dto) throws Exception {
    	mybatis.update("Calendar.update",dto);
    }
    // 삭제 
    public void delete (int seq) {
    	mybatis.delete("Calendar.delete",seq);
    }

}
