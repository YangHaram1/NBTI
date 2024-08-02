package com.nbti.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nbti.dao.ReferLineDAO;
import com.nbti.dto.ReferLineDTO;

@Service
public class ReferLineService {
	
	@Autowired
	private ReferLineDAO rldao;
	
	public void insert(List<ReferLineDTO> list) {
		for(ReferLineDTO dto: list) {
			rldao.insert(dto);
		}
	}

}
