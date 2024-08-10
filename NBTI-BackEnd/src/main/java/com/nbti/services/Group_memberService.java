package com.nbti.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nbti.dao.ChatDAO;
import com.nbti.dao.Group_memberDAO;
import com.nbti.dao.MembersDAO;
import com.nbti.dto.ChatDTO;
import com.nbti.dto.Group_memberDTO;

@Service
public class Group_memberService {
	@Autowired
	private Group_memberDAO dao;
	
	@Autowired
	private MembersDAO msdao;
	
	@Autowired
	private ChatDAO cdao;
	
	public void insert(List<Group_memberDTO> list) throws Exception {
		dao.insert(list);
	}
	
	@Transactional
	public void insert(String [] members, int group_seq, String loginID) throws Exception {
		for(int i=0;i<members.length;i++) {
			Group_memberDTO dto = new Group_memberDTO(group_seq,members[i],0,"Y","N","새채팅방");
			dao.insert(dto);
		}
		List<String> memberList = new ArrayList<>(Arrays.asList(members)); //네임받아올 리스트
		memberList=msdao.chatMembersName(memberList);
		String name=msdao.getMemberName(loginID);
		String result=name+"님이 ";
		int index=0;
		for (String str : memberList) {
			if(index==members.length-1) {
				result+=str+"님을 초대했습니다.";
			}
			else {
				result+=str+"님, ";
			}
			index++;
		}
		
		ChatDTO cdto=new ChatDTO(0,"system",result,null,group_seq,0);
		cdao.insert(cdto);
		
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
	
	@Transactional
	public void delete(int group_seq,String member_id) throws Exception{
		dao.delete(group_seq,member_id);
		String name=msdao.getMemberName(member_id);
		ChatDTO cdto=new ChatDTO(0,"system",name+"님이 퇴장하셨습니다",null,group_seq,0);
		cdao.insert(cdto);
	}
	
	public void update_check(int group_seq,String member_id,int last_chat_seq) throws Exception{
		dao.update_check(group_seq,member_id,last_chat_seq);
	}
	
	public void update_name(int group_seq,String member_id,String name) throws Exception{
		dao.update_name(group_seq,member_id,name);
	}
	
	public void update_alarm(int group_seq,String member_id) throws Exception{
		dao.update_alarm(group_seq,member_id);
	}
	
	public void update_bookmark(int group_seq,String member_id) throws Exception{
		dao.update_bookmark(group_seq,member_id);
	}
}
