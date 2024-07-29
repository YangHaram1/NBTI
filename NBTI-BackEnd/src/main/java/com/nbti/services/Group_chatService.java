package com.nbti.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nbti.dao.Group_chatDAO;
import com.nbti.dto.Group_chatDTO;
import com.nbti.dto.Group_memberDTO;

@Service
public class Group_chatService {
	
	@Autowired
	private Group_chatDAO dao;
	
	
	public int insert(String member_id) throws Exception{
		return dao.insert(member_id);
	}
	
	public List<Group_chatDTO> getList(List<Group_memberDTO> list) throws Exception{
		return dao.getList(list);
	}
	

}
