package com.nbti.dao;

import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nbti.dto.BookmarkDTO;

@Repository
public class BookmarkDAO {

	
	@Autowired
	private SqlSession mybatis;
	
	
	// 북마크 추가
	public int insert(BookmarkDTO dto) {
		return mybatis.insert("Bookmark.insert", dto);
	}
	
	// 북마크 삭제
	public int delete(Map<String, Object> map) {
		return mybatis.delete("Bookmark.delete", map);
	}
	
	// 게시글이 북마크 되었는지
	public boolean isBookmarkStatus(Map<String, Object> map) {
		return mybatis.selectOne("Bookmark.isBookmarkStatus", map);
	}
	
}
