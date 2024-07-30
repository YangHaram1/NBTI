package com.nbti.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nbti.dao.DocSubDAO;
import com.nbti.dto.DocSubDTO;

@Service
public class DocSubService {
	
	@Autowired
	private DocSubDAO dsdao;
	
	public List<DocSubDTO> selectAll(){
		return dsdao.selectAll();
	}

}
