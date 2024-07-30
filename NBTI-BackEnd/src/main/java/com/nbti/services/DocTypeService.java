package com.nbti.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nbti.dao.DocTypeDAO;
import com.nbti.dto.DocSubDTO;

@Service
public class DocTypeService {
	
	@Autowired
	private DocTypeDAO dtdao;
	
	public List<DocSubDTO> selectAll(){
		return dtdao.selectAll();
	}

}
