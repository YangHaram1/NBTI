package com.nbti.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nbti.dao.ReferLineDAO;
import com.nbti.dto.ReferLineDTO;

@Service
public class ReferLineService {
	
	@Autowired
	private ReferLineDAO rldao;
	
	@Transactional
	public void insert(List<ReferLineDTO> list) {
		for(ReferLineDTO dto: list) {
			rldao.insert(dto);
		}
	}
	
	public List<ReferLineDTO> getReferLine(int seq){
		return rldao.selectLine(seq);
	}

	public void readCheak(int seq, String id) {
		rldao.updateRead(seq, id);
	}
}
