package com.nbti.services;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nbti.dao.BookmarkDAO;
import com.nbti.dto.BookmarkDTO;

@Service
public class BookmarkService {
	
	@Autowired
	private BookmarkDAO bdao;
	
	// 북마크 추가
	public int insert(BookmarkDTO dto) {
		return bdao.insert(dto);
	}

	// 북마크 삭제
	public int delete(Map<String, Object> map) {
		return bdao.delete(map);
	}
	
	
	
}
