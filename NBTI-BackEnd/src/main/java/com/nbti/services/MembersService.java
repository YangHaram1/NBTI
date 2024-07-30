package com.nbti.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nbti.dao.MembersDAO;
import com.nbti.dto.MembersDTO;

@Service
public class MembersService {
	
	@Autowired
	private MembersDAO mdao;
	// 로그인
	public boolean login(MembersDTO dto) {
		return mdao.login(dto);
	}
	
	public MembersDTO selectMyData(String id) {
		return mdao.selectMyData(id);
	}
	
	public void updateMyData(MembersDTO dto) {
		mdao.updateMyData(dto);
	}
	// 사용자 전체 출력
	public List<MembersDTO> selectAll(){
		return mdao.selectAll();
	}
	//회원가입
	public void insert(MembersDTO dto) {
		mdao.insert(dto);
	}
<<<<<<< HEAD
	// 사용자 조회 
	   public List<Map<String, Object>> getMembers() {
	        return mdao.getMembers();
	    }
=======
	
	// 비밀번호 변경시 기존 비밀번호 확인
	public boolean checkPw(HashMap<String, String> map) {
		return mdao.checkPw(map);
	}
	
	// 비밀번호 변경
	public boolean changePw(HashMap<String, String> map) {
		return mdao.changePw(map);
	}
	
	
>>>>>>> b7607a331167fa04d2b9938234beac389d0ef076
		
}

