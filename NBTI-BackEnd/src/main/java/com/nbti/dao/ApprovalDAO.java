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
	
	public List<ListDocDTO> selectWriterIsMe(Map<String, Object> map) {
		return mybatis.selectList("Approval.selectWriterIsMe",map);
	}
	
	public List<ListDocDTO> selectReferIsMe(Map<String, Object> map) {
		return mybatis.selectList("Approval.selectReferIsMe",map);
	}
	
	public List<ListDocDTO> selectApprovalIsMe(Map<String, Object> map){
		return mybatis.selectList("Approval.selectApprovalIsMe", map);
	}
	
	public List<ListDocDTO> selectApprovalWait(Map<String, Object> map){
		return mybatis.selectList("Approval.selectApprovalWait",map);
		//
	}
	
	public List<ListDocDTO> selectApprovalBook(Map<String, Object> map){
		return mybatis.selectList("Approval.selectApprovalBook",map);
		//
	}
	
	public List<ListDocDTO> selectReturn(Map<String, Object> map){
		return mybatis.selectList("Approval.selectReturn",map);
	}
	
	public List<ListDocDTO> selectCancle(Map<String, Object> map){
		return mybatis.selectList("Approval.selectCancle",map);
	}
	
	public ApprovalDTO selectApproval(int seq){
		return mybatis.selectOne("Approval.selectApproval",seq);
	}
	
	public List<ListDocDTO> selectTemp(Map<String, Object> map){
		return mybatis.selectList("Approval.selectTemp",map);
	}
	
	public List<ListDocDTO> selectReferIsMeWait(Map<String, Object> map){
		return mybatis.selectList("Approval.selectReferIsMeWait",map);
		//
	}
	
	public int selectCount(Map<String, String> map) {
		return mybatis.selectOne("Approval.selectCount", map);
	}
	
	public void delete(int seq) {
		mybatis.delete("Approval.delete",seq);
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

	public List<Map<String, Object>> getVacationHistory(String memberId,int start, int end) {
		Map<String, Object> param = new HashMap<>();
		param.put("start", start);
		param.put("end", end);
		param.put("memberId", memberId);
		
		return mybatis.selectList("Approval.getVacationHistory", param);
	}
	public int getTotalRecordCount(String memberId) {
		return mybatis.selectOne("Approval.getTotalRecordCount",memberId);
	}
	public List<Map<String,Object>> getAllVacationHistory(int start,int end){
		Map<String, Object> param = new HashMap<>();
		param.put("start", start);
		param.put("end", end);
		
		return mybatis.selectList("Approval.getAllVacationHistory",param);
	}
	public int getAllRecordCount() {
		return mybatis.selectOne("Approval.getAllRecordCount");
	}
	
	public String getApprovaler(int seq) {
		return mybatis.selectOne("Approval.selectApprovalerId", seq);

	}


}
