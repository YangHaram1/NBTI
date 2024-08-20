package com.nbti.dao;

import org.apache.ibatis.session.SqlSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nbti.dto.DocDraftDTO;

@Repository
public class DocDraftDAO {
	
	@Autowired
	private SqlSession mybatis;
	
	public void insert(DocDraftDTO dddto) {
		mybatis.insert("DocDraft.insert", dddto);
	}
	
	public DocDraftDTO selectContent(int seq) {
		return mybatis.selectOne("DocDraft.selectContent",seq);
	}
	
	public void delete(int seq) {
		mybatis.delete("DocDraft.delete",seq);
	}

}
