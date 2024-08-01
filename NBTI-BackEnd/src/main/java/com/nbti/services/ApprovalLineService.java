package com.nbti.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nbti.dao.ApprovalLineDAO;

@Service
public class ApprovalLineService {
	
	@Autowired
	private ApprovalLineDAO aldao;
	
}
