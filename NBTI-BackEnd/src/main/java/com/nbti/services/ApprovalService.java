package com.nbti.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nbti.dao.ApprovalDAO;
import com.nbti.dto.ApprovalDTO;

@Service
public class ApprovalService {
	
	@Autowired
	private ApprovalDAO adao;
	
//	public int write(ApprovalDTO adto) {
//		return adao.write(adto);
//	}

}
