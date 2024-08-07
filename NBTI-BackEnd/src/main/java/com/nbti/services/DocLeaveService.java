package com.nbti.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nbti.dao.DocLeaveDAO;
import com.nbti.dto.DocLeaveDTO;

@Service
public class DocLeaveService {
	
	@Autowired
	private DocLeaveDAO dldao;
	
	public DocLeaveDTO getContent(int seq) {
		return dldao.getContent(seq);
	} 

}
