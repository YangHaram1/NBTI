package com.nbti.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nbti.dto.Group_memberDTO;

@Repository
public class Group_memberDAO {
	@Autowired
	private SqlSession mybatis;

	public void insert(List<Group_memberDTO> list) throws Exception {
		for (Group_memberDTO dto : list) {
			// System.out.println(dto.getMember_id());
			mybatis.insert("Group_member.insert", dto);
		}
	}
	
	public void insert(Group_memberDTO dto) throws Exception{
		mybatis.insert("Group_member.insert",dto);
	}

	public boolean check(List<String> list) throws Exception { //채팅방 만들수있는지 없는지 검사
		Map<String, Object> map = new HashMap<>();
		map.put("list", list);
		map.put("size", list.size());
		Integer groupSeq = mybatis.selectOne("Group_member.check", map);
		return groupSeq != null;
	}

	public List<Group_memberDTO> list(String member_id) throws Exception {

		return mybatis.selectList("Group_member.list", member_id);

	}

	public List<Group_memberDTO> members(int group_seq) throws Exception {

		return mybatis.selectList("Group_member.members",group_seq);

	}
	
	public Group_memberDTO member(int group_seq,String member_id) throws Exception{
		Map<String, Object> map = new HashMap<>();
		map.put("group_seq", group_seq);
		map.put("member_id", member_id);
		return mybatis.selectOne("Group_member.member",map);
	}

	public void delete(int group_seq, String member_id) throws Exception {
		Map<String, String> map = new HashMap<>();
		map.put("group_seq", String.valueOf(group_seq));
		map.put("member_id", member_id);
		mybatis.delete("Group_member.delete", map);
	}
	
	public void update_check(int group_seq,String member_id,int last_chat_seq) throws Exception{
		Map<String, String> map = new HashMap<>();
		map.put("group_seq", String.valueOf(group_seq));
		map.put("member_id", member_id);
		map.put("last_chat_seq", String.valueOf(last_chat_seq));
		mybatis.delete("Group_member.update_check", map);
	}
	
	public void update_name(int group_seq,String member_id,String name) throws Exception{
		Map<String, String> map = new HashMap<>();
		map.put("group_seq", String.valueOf(group_seq));
		map.put("member_id", member_id);
		map.put("name", name);
		mybatis.delete("Group_member.update_name", map);
	}
	
	public void update_alarm(int group_seq,String member_id) throws Exception{
		Map<String, String> map = new HashMap<>();
		map.put("group_seq", String.valueOf(group_seq));
		map.put("member_id", member_id);
		mybatis.delete("Group_member.update_alarm", map);
	}
	
	public void update_bookmark(int group_seq,String member_id) throws Exception{
		Map<String, String> map = new HashMap<>();
		map.put("group_seq", String.valueOf(group_seq));
		map.put("member_id", member_id);
		mybatis.delete("Group_member.update_bookmark", map);
	}
	
	

}
