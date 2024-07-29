package com.nbti.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nbti.dao.MembersDAO;
import com.nbti.dto.MembersDTO;

@Service
public class MembersService {
	
	@Autowired
	private MembersDAO mdao;
	
	public boolean login(MembersDTO dto) {
		return mdao.login(dto);
	}
	
	public MembersDTO selectMyData(String id) {
		return mdao.selectMyData(id);
	}
	
	public void updateMyData(MembersDTO dto) {
		mdao.updateMyData(dto);
	}
	
	public List<MembersDTO> selectAll(){
		return mdao.selectAll();
	}
		
}
