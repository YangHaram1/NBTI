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
			mybatis.insert("Group_member.insert", dto);
		}
	}

	public boolean check(List<String> list) throws Exception {
		Map<String, Object> map = new HashMap<>();
		map.put("list", list);
		map.put("size", list.size());
		Integer groupSeq = mybatis.selectOne("Group_member.check", map);
		return groupSeq != null;
	}

}
