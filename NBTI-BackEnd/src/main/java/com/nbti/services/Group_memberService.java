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
	
	public List<Group_memberDTO> list(String member_id) throws Exception{
		return dao.list(member_id);
	}
	
	public void delete(int group_seq,String member_id) throws Exception{
		dao.delete(group_seq,member_id);
	}
}
