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
	
	// 기안문서
	public List<ListDocDTO> getWriterIsMe(String id) {
		return adao.selectWriterIsMe(id);
	}
	
	// 참조문서
	public List<ListDocDTO> getReferIsMe(String id){
		return adao.selectReferIsMe(id);
	}
	
	// 결재문서
	public List<ListDocDTO> getApprovalIsMe(String id){
		return adao.selectApprovalIsMe(id);
	}
	

}
