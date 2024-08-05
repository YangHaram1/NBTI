package com.nbti.services;

import java.util.List;
import java.util.Map;

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
	
	public List<User_historyDTO> list(Map<String, Object> params) throws Exception{
		return dao.list(params);
	}
	
	public int getHistoryCount(Map<String, Object> params) throws Exception{
		return dao.getHistoryCount(params);
		
	}
}
