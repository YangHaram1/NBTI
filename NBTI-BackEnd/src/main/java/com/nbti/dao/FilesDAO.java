package com.nbti.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nbti.dto.FilesDTO;

@Repository
public class FilesDAO {
	
	@Autowired
	private SqlSession mybatis;
	
	public void insertApprovalFile(FilesDTO dto) {
		mybatis.insert("Files.insertApprovalFile", dto);
	}
	
	public List<FilesDTO> getList(int seq){
		return mybatis.selectList("Files.selectList", seq);
	}
	
	// 유나 게시판 파일 목록 출력
	public List<FilesDTO> selectList(int seq,int code){
		Map<String, Integer> map =new HashMap<>();
		map.put("seq", seq);
		map.put("code", code);
		return mybatis.selectList("Files.select", map);
	}

}
