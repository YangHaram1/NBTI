package com.nbti.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nbti.dto.DocVacationDTO;

@Repository
public class DocVacationDAO {
	
	@Autowired
	private SqlSession mybatis;
	
	public void insert(DocVacationDTO dvdto) {
		System.out.println("check : " +dvdto.getVacation_seq()+":"+dvdto.getVacation_category() +":"+ dvdto.getVacation_start()+":"+dvdto.getStart_half()+":"+dvdto.getStart_half_ap()+":"+dvdto.getEnd_half()+":"+dvdto.getEnd_half_ap()+":"+dvdto.getVacation_end());
		mybatis.insert("DocVacation.insert", dvdto);
	}
	
	public DocVacationDTO selectContent(int seq) {
		return mybatis.selectOne("DocVacation.selectContent",seq);
	}

}
