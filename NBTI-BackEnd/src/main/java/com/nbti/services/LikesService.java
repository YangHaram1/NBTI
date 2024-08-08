package com.nbti.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nbti.dao.LikesDAO;
import com.nbti.dto.LikesDTO;

@Service
public class LikesService {

	@Autowired
	private LikesDAO ldao;
	
	// 좋아요 추가
	public int insert(LikesDTO dto) {
		return ldao.insert(dto);
	}
		
	// 좋아요 취소
	public int delete(Map<String, Object> map) {
		return ldao.delete(map);
	}

	// 좋아요 추가 되었는지
	public boolean isLiked(Map<String, Object> map) {
		return ldao.isLiked(map);
	}
	
	// 좋아요 개수
    public int likeCount(int reply_seq) {
        return ldao.likeCount(reply_seq);
    }
	
}
