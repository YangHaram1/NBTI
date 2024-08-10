package com.nbti.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nbti.dto.ReferLineDTO;

@Repository
public class ReferLineDAO {
	
	@Autowired
	private SqlSession mybatis;
	
	public void insert(ReferLineDTO dto) {
		mybatis.insert("ReferLine.insert", dto);
	}
	
	
	public List<ReferLineDTO> selectLine(int seq){
		return mybatis.selectList("ReferLine.selectLine",seq);
	}
	
	public void updateRead(int seq, String id) {
		Map<String, Object> map = new HashMap<>();
		map.put("seq", seq);
		map.put("id", id);
		mybatis.update("ReferLine.updateRead", map);
	}
	
}
