package com.nbti.services;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nbti.dao.ApprovalDAO;
import com.nbti.dao.ApprovalLineDAO;
import com.nbti.dto.ApprovalLineDTO;

@Service
public class ApprovalLineService {
	
	@Autowired
	private ApprovalLineDAO aldao;
	@Autowired
	private ApprovalDAO adao;
	
	
	public List<Map<String,Object>> getApprovalLine(int seq) {
		return aldao.selectLine(seq);
	}
	
	public void updateMyLine(Map<String, Object> map) {
		// 코멘트, 상태 업데이트 
		aldao.updateComment(map);
	}
	
	@Transactional
	public void updateNextLine(Map<String, Object> map) {
		
		// 현재 문서의 결재라인 수 추출
		int total_seq = aldao.selectLineCount(map);
		
		// 현재 아이디의 order 추출 -> 다음 order 상태 바꾸기 위해서
		// 다음 order가 있으면 문서상태 유지, 없으면 문서상태 변경
		int order = aldao.selectOrder(map);
		int seq = (int)map.get("temp_seq");
		String approvalYN = (String)map.get("approvalYN");
		String setlist = (String)map.get("setlist");
		String docHeader = "";
		
		// 나중에 코드 개선시 수정하기
		if(setlist.equals("업무기안서")) {
			docHeader = "DF";
		}else if(setlist.equals("휴직신청서")) {
			docHeader="LE";
		}else {
			docHeader="VC";
		}
		
		// 문서 상태가 승인일 때, 
		if(approvalYN.equals("p")) {
			// 현재 내 순서가 최종 순서라면 문서상태 완료로 업데이트 후 문서번호 추가
			if(total_seq == order) {
				adao.updateDocState(seq, approvalYN);
				adao.createApprovalSeq(seq, docHeader);
				
			// 현재 내 순서가 최종 순서가 아니라면 다음 결재자 상태 업데이트	
			}else if(total_seq > order) {
				int updateOrder = (order+(int)1);
//				System.out.println("order 값증가 및 업데이트 필요" +order +":"+ (updateOrder));
				map.put("updateOrder",updateOrder);
				aldao.updateNextApproval(map);
			}
		// 문서 상태가 반려라면 문서상태를 반려로 변경
		}else {
			// 문서 상태를 반려로 변경
			adao.updateDocState(seq, approvalYN);
			System.out.println("반려 문서로 상태 최신화 중지");
		}
		
	}
	
}
