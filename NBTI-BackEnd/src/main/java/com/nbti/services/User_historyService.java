package com.nbti.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nbti.dao.User_histroyDAO;
import com.nbti.dto.User_historyDTO;

@Service
public class User_historyService {
	
	@Autowired
	private User_histroyDAO dao;
	
	public void insert(User_historyDTO dto) throws Exception{
		dao.insert(dto);
	}
}
