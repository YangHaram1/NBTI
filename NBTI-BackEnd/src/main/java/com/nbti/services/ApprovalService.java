package com.nbti.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nbti.dao.ApprovalDAO;

@Service
public class ApprovalService {
	
	@Autowired
	private ApprovalDAO adao;

}
