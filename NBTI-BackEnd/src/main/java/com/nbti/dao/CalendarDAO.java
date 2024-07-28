package com.nbti.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nbti.dto.CalendarDTO;

@Repository
public class CalendarDAO {
	@Autowired
	private SqlSession mybatis;
	
	//캘린더 입력
	public void insert (CalendarDTO dto) {
		System.out.println("dto seq : " + dto.getSeq());
		System.out.println("dto member id : " + dto.getMember_id());
		System.out.println("dto title : " + dto.getTitle());
		System.out.println("dto contents : " + dto.getContents());
		System.out.println("dto start date : " + dto.getStart_date());
		System.out.println("dto end date : " + dto.getEnd_date());
		dto.setMember_id("test");
		mybatis.insert("Calendar.insert",dto);
	}
}
