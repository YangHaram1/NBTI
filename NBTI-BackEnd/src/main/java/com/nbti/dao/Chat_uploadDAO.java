package com.nbti.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nbti.dto.Chat_uploadDTO;

@Repository
public class Chat_uploadDAO {
	@Autowired
	private SqlSession mybatis;
	
	public int insert(Chat_uploadDTO dto) throws Exception{
		mybatis.insert("Chat_upload.insert",dto);
		return dto.getSeq();
	}
	
	public List<Chat_uploadDTO> listByGroup_seq(int group_seq) throws Exception{
		return mybatis.selectList("Chat_upload.listByGroup_seq",group_seq);
	}
	
	public void deleteBySeq(int seq) throws Exception{
		mybatis.delete("Chat_upload.deleteBySeq",seq);
	}
	
}
