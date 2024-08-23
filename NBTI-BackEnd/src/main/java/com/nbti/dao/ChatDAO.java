package com.nbti.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nbti.dto.ChatDTO;
import com.nbti.dto.ChatImgDTO;

@Repository
public class ChatDAO {

	@Autowired
	private SqlSession mybatis;
	
	public ChatDTO insert(ChatDTO dto) throws Exception {
		mybatis.insert("Chat.insert",dto);
		dto.setWrite_date(mybatis.selectOne("Chat.date",dto.getSeq()));
		return dto;
	}
	
	public List<ChatImgDTO> list(int group_seq) throws Exception{
		return mybatis.selectList("Chat.list",group_seq);
	}
	
	public List<ChatImgDTO> search(String content,int group_seq) throws Exception{
		Map<String, String> maps=new HashMap<>();
		maps.put("content", content);
		maps.put("group_seq", String.valueOf(group_seq));
		return mybatis.selectList("Chat.search",maps);
	}
	
	public ChatDTO getLastDTO(int group_seq) throws Exception{
		return mybatis.selectOne("Chat.getLastDto",group_seq);
	}
	
	public int unread(int group_seq,int last_chat_seq,int seq)throws Exception {
		Map<String, Integer> maps=new HashMap<>();
		maps.put("group_seq", group_seq);
		maps.put("last_chat_seq", last_chat_seq);
		maps.put("seq", seq);
		return mybatis.selectOne("Chat.unread",maps);
	}
	
	public int unreadTotl(int group_seq,String member_id)throws Exception {
		Map<String, Object> maps=new HashMap<>();
		maps.put("group_seq", group_seq);
		maps.put("member_id", member_id);
		return mybatis.selectOne("Chat.unreadTotal",maps);
	}
	
	public void deleteByUploadSeq(int upload_seq)throws Exception {
		mybatis.delete("Chat.deleteByUpload_seq",upload_seq);
	}
}
