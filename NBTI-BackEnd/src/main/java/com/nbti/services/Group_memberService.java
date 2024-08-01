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
	
	public void insert(Group_memberDTO dto) throws Exception {
		dao.insert(dto);
	}
	
	public boolean check(List<String> list) throws Exception{
		return dao.check(list);
	}
	
	public List<Group_memberDTO> list(String member_id) throws Exception{
		return dao.list(member_id);
	}
	
	public List<Group_memberDTO> members(int group_seq) throws Exception{
		return dao.members(group_seq);
	}
	
	
	public Group_memberDTO member(int group_seq,String member_id) throws Exception{
		return dao.member(group_seq,member_id);
	}
	
	public void delete(int group_seq,String member_id) throws Exception{
		dao.delete(group_seq,member_id);
	}
	
	public void update_check(int group_seq,String member_id,int last_chat_seq) throws Exception{
		dao.update_check(group_seq,member_id,last_chat_seq);
	}
	
	public void update_name(int group_seq,String member_id,String name) throws Exception{
		dao.update_name(group_seq,member_id,name);
	}
}
