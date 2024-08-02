package com.nbti.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nbti.dao.ApprovalLineDAO;
import com.nbti.dto.ApprovalLineDTO;

@Service
public class ApprovalLineService {
	
	@Autowired
	private ApprovalLineDAO aldao;
	
	public void insert(List<ApprovalLineDTO> list) {
		for(ApprovalLineDTO dto: list) {
			aldao.insert(dto);
		}
	}
	
}
