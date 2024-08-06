package com.nbti.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nbti.dto.ApprovalDTO;
import com.nbti.dto.ListDocDTO;

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
	
	public List<ListDocDTO> selectWriterIsMe(String id) {
		return mybatis.selectList("Approval.selectWriterIsMe",id);
	}
	
	public List<ListDocDTO> selectReferIsMe(String id) {
		return mybatis.selectList("Approval.selectReferIsMe",id);
	}
	
	public List<ListDocDTO> selectApprovalIsMe(String id){
		return mybatis.selectList("Approval.selectApprovalIsMe", id);
	}
	
	public List<ListDocDTO> selectApprovalWait(String id){
		return mybatis.selectList("Approval.selectApprovalWait",id);
	}
	
	public List<ListDocDTO> selectApprovalBook(String id){
		return mybatis.selectList("Approval.selectApprovalBook",id);
	}
	
	public List<ListDocDTO> selectReturn(String id){
		return mybatis.selectList("Approval.selectReturn",id);
	}
	
	public List<ListDocDTO> selectCancle(String id){
		return mybatis.selectList("Approval.selectCancle",id);
	}

}
