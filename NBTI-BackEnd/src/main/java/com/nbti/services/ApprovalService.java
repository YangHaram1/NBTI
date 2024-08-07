package com.nbti.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nbti.dao.ApprovalDAO;
import com.nbti.dto.ApprovalDTO;
import com.nbti.dto.ListDocDTO;

@Service
public class ApprovalService {
	
	@Autowired
	private ApprovalDAO adao;
	
	// 기안문서(문서함)
	public List<ListDocDTO> getWriterIsMe(String id) {
		return adao.selectWriterIsMe(id);
	}
	
	// 참조문서(문서함)
	public List<ListDocDTO> getReferIsMe(String id){
		return adao.selectReferIsMe(id);
	}
	
	// 결재문서(문서함)
	public List<ListDocDTO> getApprovalIsMe(String id){
		return adao.selectApprovalIsMe(id);
	}
	
	// 반려문서(문서함)
	public List<ListDocDTO> getReturn(String id){
		return adao.selectReturn(id);
	}
	
	// 취소문서(문서함)
	public List<ListDocDTO> getCancle(String id){
		return adao.selectCancle(id);
	}
	
	// 결재 대기 문서(결재하기)
	public List<ListDocDTO> getApprovalWait(String id){
		return adao.selectApprovalWait(id);
	}
	
	// 결재 예정 문서(결재하기)
	public List<ListDocDTO> getApprovalBook(String id){
		return adao.selectApprovalBook(id);
	}
	
	// 디테일 페이지(공통정보 출력)
	public ApprovalDTO getApproval(int seq){
		return adao.selectApproval(seq);
	}

}
