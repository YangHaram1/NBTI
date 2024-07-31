package com.nbti.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nbti.dto.ChatDTO;

@Repository
public class ChatDAO {

	@Autowired
	private SqlSession mybatis;
	
	public ChatDTO insert(ChatDTO dto) throws Exception {
		mybatis.insert("Chat.insert",dto);
		dto.setWrite_date(mybatis.selectOne("Chat.date",dto.getSeq()));
		return dto;
	}
	
	public List<ChatDTO> list(int group_seq) throws Exception{
		return mybatis.selectList("Chat.list",group_seq);
	}
	
	public List<ChatDTO> search(String content,int group_seq) throws Exception{
		Map<String, String> maps=new HashMap<>();
		maps.put("content", content);
		maps.put("group_seq", String.valueOf(group_seq));
		return mybatis.selectList("Chat.search",maps);
	}
	
	public ChatDTO getLastDTO(int group_seq) throws Exception{
		return mybatis.selectOne("Chat.getLastDto",group_seq);
	}
}
