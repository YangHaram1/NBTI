package com.nbti.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
	
	public ApprovalDTO selectApproval(int seq){
		return mybatis.selectOne("Approval.selectApproval",seq);
	}
	
	public List<ListDocDTO> selectTemp(String id){
		return mybatis.selectList("Approval.selectTemp",id);
	}
	
	public List<ListDocDTO> selectReferIsMeWait(String id){
		return mybatis.selectList("Approval.selectReferIsMeWait",id);
	}
	
	// 문서 정보 최신화
	public void updateDocState(int temp_seq, String state) {
		Map<String, Object> map = new HashMap<>();
		map.put("temp_seq", temp_seq);
		map.put("state", state);
		mybatis.update("Approval.updateDocState", map);
	}
	
	// 결재완료 시 문서 번호 생성
	public void createApprovalSeq(int temp_seq, String docHeader) {
		Map<String, Object> map = new HashMap<>();
		map.put("temp_seq", temp_seq);
		map.put("docHeader", docHeader);
		mybatis.update("Approval.createApprovalSeq", map);
	}
	
	public void updateDocStateCancle(int seq) {
		mybatis.update("Approval.updateDocStateCancle", seq);
	}

}
