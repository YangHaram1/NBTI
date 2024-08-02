package com.nbti.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nbti.dto.ApprovalDTO;

@Repository
public class ApprovalDAO {
	
	@Autowired
	private SqlSession mybatis;
	
	public int write(ApprovalDTO adto) {
		mybatis.insert("Approval.insert", adto);
		int temp_seq = adto.getTemp_seq();
		System.out.println(temp_seq);
		return temp_seq;
	}

}
