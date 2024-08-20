package com.nbti.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nbti.dto.ApprovalLineDTO;

@Repository
public class ApprovalLineDAO {
	
	@Autowired
	private SqlSession mybatis;
	
	public void insert(ApprovalLineDTO dto) {
		mybatis.insert("ApprovalLine.insert", dto);
	}
	
	public List<Map<String,Object>> selectLine(int seq){
		return mybatis.selectList("ApprovalLine.selectLine",seq);
	}
	
	// 결재 승인, 반려 코멘트 저장
	public void updateComment(Map<String, Object> map) {
		 mybatis.update("ApprovalLine.updateComment", map);
	}
	
	// 결재 승인, 반려 코멘트 저장 시 해당 아이디의 order 검색
	public int selectOrder(Map<String, Object> map) {
		int order = mybatis.selectOne("ApprovalLine.selectOrder", map);
		System.out.println(order);
		return order;
	}
	
	// 임시번호에 따른 결재라인 수 출력 (현재는 3이 나와야 함.)
	public int selectLineCount(Map<String, Object> map) {
		int count = mybatis.selectOne("ApprovalLine.selectLineCount", map);
		System.out.println("결재라인 수 count : "+count);
		return count;
	}
	
	// 결재 승인시 다음 결재자 상태 업데이트 ( b -> w )
	public void updateNextApproval(Map<String, Object> map) {
		mybatis.update("ApprovalLine.updateNextApproval", map);
	}
	
	public void delete(int seq) {
		mybatis.delete("ApprovalLine.delete",seq);
	}

}
