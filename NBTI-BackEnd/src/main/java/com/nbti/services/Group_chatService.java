package com.nbti.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nbti.dao.ChatDAO;
import com.nbti.dao.Group_chatDAO;
import com.nbti.dao.Group_memberDAO;
import com.nbti.dto.ChatDTO;
import com.nbti.dto.Group_chatDTO;
import com.nbti.dto.Group_chatSizeDTO;
import com.nbti.dto.Group_memberDTO;

@Service
public class Group_chatService {
	
	@Autowired
	private Group_chatDAO dao;
	
	@Autowired
	private Group_memberDAO mdao;
	
	@Autowired
	private ChatDAO cdao;
	
	
	
	@Transactional
	public void insert(String member_id,String loginID) throws Exception{
		List<String> list =new ArrayList<>();
		list.add(member_id);
		list.add(loginID);
		boolean check=mdao.check(list);
		
		if(!check) {
			int seq=dao.insert();	
			List<Group_memberDTO> member_list=new ArrayList<>();
			Group_memberDTO dto= new Group_memberDTO(seq,list.get(0),0,"Y","N",list.get(1));
			member_list.add(dto);
			dto= new Group_memberDTO(seq,list.get(1),0,"Y","N",list.get(0));
			member_list.add(dto);
			mdao.insert(member_list);
			ChatDTO cdto=new ChatDTO(0,"system",member_id+"님과 "+loginID+"님이 입장하셨습니다!",null,seq,0);
			cdao.insert(cdto);
		}
		
	}
	
	
	
	public List<Group_chatDTO> getList(List<Group_memberDTO> list) throws Exception{
		return dao.getList(list);
	}
	
	public void delete(int seq) throws Exception{
		dao.delete(seq);
	}
	
	
	
	public List<Group_chatSizeDTO> getChatSizeDTOs(String loginID) throws Exception {
		List<Group_memberDTO> list= new ArrayList<>();
		List<Group_chatSizeDTO> result=new ArrayList<>();
		list=mdao.list(loginID);//그멤버가 가지고있는 group_seq 뽑기	
		List<Group_chatDTO> chatList=dao.getList(list); //group_chat 목록 뽑기 seq에 맞게..사실 지금은 필없지만 나중에 group_chat에 컬럼 생기면 유용함
		
		if(chatList==null) {
			return null;
		}
		
		for(int i=0;i<chatList.size();i++) {
			int size=0;
			Group_chatDTO dto = chatList.get(i);
			for (Group_memberDTO MemberDTO : list) {
				if(MemberDTO.getGroup_seq()==dto.getSeq()) {
					List<Group_memberDTO> memberList=  mdao.members(MemberDTO.getGroup_seq()); //seq에맞는 멤버 목록
					size=memberList.size();
					int last_chat_seq=0;
					for (Group_memberDTO member : memberList) {
						if(member.getMember_id().equals(loginID)) {
							last_chat_seq=member.getLast_chat_seq();
							
							break;
						}
					}
					ChatDTO cdto=cdao.getLastDTO(dto.getSeq()); //그룹채팅방에서 마지막 메세지 가저오는거고
					int unread=0;
					if(cdto!=null) {
						unread = cdao.unread(dto.getSeq(), last_chat_seq, cdto.getSeq())-1;
					}
					result.add(new Group_chatSizeDTO(dto.getSeq(),MemberDTO.getName(),MemberDTO.getAlarm(),MemberDTO.getBookmark(),size,unread,cdto));
					break;
				}
			}
		}
		
		if(list!=null)
			return result;
			
			return null;
		
	}

}
