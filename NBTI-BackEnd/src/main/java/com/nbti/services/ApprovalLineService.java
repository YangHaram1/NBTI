package com.nbti.services;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nbti.dao.ApprovalLineDAO;
import com.nbti.dto.ApprovalLineDTO;

@Service
public class ApprovalLineService {
	
	@Autowired
	private ApprovalLineDAO aldao;
	
	public List<Map<String,Object>> getApprovalLine(int seq) {
		return aldao.selectLine(seq);
	}
	
}
