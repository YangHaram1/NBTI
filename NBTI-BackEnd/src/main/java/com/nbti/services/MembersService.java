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
		System.out.println(id);
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

	// 사용자 조회 
	   public List<Map<String, Object>> getMembers() {
	        return mdao.getMembers();
	    }
	// 관리자 사용자 수정
	   public void updateUser(MembersDTO dto) {
		   mdao.updateUser(dto);
	   }
	// 관리자 회원 탈퇴
	   public void deleteUser(String id) {
		   mdao.deleteUser(id);
	   }
	  
	// 비밀번호 변경시 기존 비밀번호 확인
	public boolean checkPw(HashMap<String, String> map) {
		return mdao.checkPw(map);
	}
	
	// 비밀번호 변경
	public boolean changePw(HashMap<String, String> map) {
		return mdao.changePw(map);
	}
	
	// 팀 코드에 의한 사용자 검색
	public List<MembersDTO> searchMembers(String team){
		return mdao.searchMembers(team);
	}
	

	
	

		
}

