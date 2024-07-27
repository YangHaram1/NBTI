package com.nbti.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nbti.dao.Group_memberDAO;
import com.nbti.dto.Group_memberDTO;

@Service
public class Group_memberService {
	@Autowired
	private Group_memberDAO dao;
	
	public void insert(Group_memberDTO dto) throws Exception {
		dao.insert(dto);
	}
}
