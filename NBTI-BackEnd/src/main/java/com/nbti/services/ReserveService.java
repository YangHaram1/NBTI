package com.nbti.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nbti.dao.ReserveDAO;
import com.nbti.dto.ReserveDTO;

@Service
public class ReserveService {
	@Autowired
	private ReserveDAO rdao;
	
	//입력
	public void insert(ReserveDTO dto) throws Exception{
		rdao.insert(dto);
	}
	
	//대기 목록 출력 
	public List<ReserveDTO> waitingList() throws Exception{
		return rdao.waitingList();
	}

}
