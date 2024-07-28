package com.nbti.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nbti.dao.Group_memberDAO;
import com.nbti.dto.Group_memberDTO;

@Service
public class Group_memberService {
	@Autowired
	private Group_memberDAO dao;
	
	public void insert(List<Group_memberDTO> list) throws Exception {
		dao.insert(list);
	}
	
	public boolean check(List<String> list) throws Exception{
		return dao.check(list);
	}
}
