package com.nbti.dao;

import java.util.List;

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

}
