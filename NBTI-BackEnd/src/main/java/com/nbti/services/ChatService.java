package com.nbti.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.nbti.dao.ChatDAO;
import com.nbti.dto.ChatDTO;

@Service
public class ChatService {
	@Autowired
	private ChatDAO dao;

	public  ChatDTO insert(ChatDTO dto) throws Exception{
		 return dao.insert(dto);
	}

	public ChatDTO post(@RequestBody ChatDTO dto) throws Exception{
		return dao.insert(dto);
	}

	public List<ChatDTO> getList(int group_seq)throws Exception {
		return dao.list(group_seq);
	}
	
	public List<ChatDTO> searchList(String content,int group_seq)throws Exception {
		return dao.search(content,group_seq);
	}
	
	public ChatDTO getLastDTO(int group_seq) throws Exception{
		return dao.getLastDTO(group_seq);
	}
}
