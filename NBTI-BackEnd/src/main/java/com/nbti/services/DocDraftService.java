package com.nbti.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nbti.dao.DocDraftDAO;
import com.nbti.dto.DocDraftDTO;

@Service
public class DocDraftService {
	
	@Autowired
	private DocDraftDAO ddao;
	
	public DocDraftDTO getContent(int seq) {
		
		return ddao.selectContent(seq);
	}
	

}
