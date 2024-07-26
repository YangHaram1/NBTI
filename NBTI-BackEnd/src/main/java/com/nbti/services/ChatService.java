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

	public List<ChatDTO> getList()throws Exception {
		return dao.list();
	}
	
	public List<ChatDTO> searchList(String content)throws Exception {
		return dao.search(content);
	}
}
