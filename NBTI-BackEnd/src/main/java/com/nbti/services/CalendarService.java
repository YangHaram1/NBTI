package com.nbti.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nbti.dao.CalendarDAO;
import com.nbti.dto.CalendarDTO;

@Service
public class CalendarService {
	@Autowired
	private CalendarDAO cdao;
	
	// 입력
	public void insert (CalendarDTO dto)  throws Exception {
		cdao.insert(dto);
	}
    
	// 목록
    public List<CalendarDTO> list (String memberId) throws Exception{
    	List<CalendarDTO> list = cdao.list(memberId);
    	return list;
    }
    
    // 수정
    public void update (CalendarDTO dto) throws Exception {
    	cdao.update(dto);
    }
    
    // 삭제 
    public void delete (int seq) {
    	cdao.delete(seq);
    }

}
