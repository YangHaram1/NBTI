package com.nbti.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nbti.dao.DocVacationDAO;
import com.nbti.dto.DocVacationDTO;

@Service
public class DocVacationService {
	
	@Autowired
	private DocVacationDAO dvdao;
	
	public DocVacationDTO getContent(int seq) {
		return dvdao.selectContent(seq);
	}

}
