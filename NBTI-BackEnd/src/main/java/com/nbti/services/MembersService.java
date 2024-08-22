package com.nbti.services;

import java.sql.Timestamp;
import java.util.ArrayList;
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
	// 사용자목록 회원 검색 ( 이름으로 )
	   public List<Map<String, Object>> searchUser(String name){
		    return mdao.searchUser(name);
		}
	// 팀 코드로 사용자 조회
	   public List<MembersDTO> selectByTeam(String team_code){
		   return mdao.selectByTeam(team_code);
	   }
	  
	// 비밀번호 변경시 기존 비밀번호 확인
	public boolean checkPw(HashMap<String, String> map) {
		return mdao.checkPw(map);
	}
	
	// 비밀번호 변경
	public boolean changePw(HashMap<String, String> map) {
		return mdao.changePw(map);
	}
	
	public Timestamp getPwChangeDate(String id) {
		return mdao.selectChangeDate(id);
	}
	
	// 팀 코드에 의한 사용자 검색
	public List<Map<String, Object>> searchMembers(String team){
		return mdao.searchMembers(team);
	}
	
	// 아이디에 따른 이름, 팀코드, 팀명, 부서코드, 부서명, 관리자 권한 코드, 관리자 권한명 추출
	public Map<String, Object> memberData(String id){
		return mdao.memberData(id);
	}
	
	// 아이디에 따른 이름, 팀코드, 팀명, 부서코드, 부서명, 관리자 권한 코드, 관리자 권한명 추출
	public List<Map<String, Object>> approvalList(List<Map<String, Object>> approvalLine){
		
		List<Map<String, Object>> list = new ArrayList<>();
		
		for (Map<String, Object> map : approvalLine) {
			
			String id = (String)map.get("id");
			if(id == null) {
				id = (String)map.get("referer");
				System.out.println("referer:"+id);
			}
			
			Map<String, Object> memberDataMap = mdao.memberData(id);
	        if (memberDataMap != null) {
	        	map.putAll(memberDataMap);
	        }
	        list.add(map);
		}
		return list;
	}
	
	
	public double selectPeriod(String id) {
		return mdao.selectPeriod(id);
	}

	   public Map<String, Object> applyForVacation(String memberId, double days) {
	        // 현재 남은 휴가 일수 가져오기
	        double remainingVacation = mdao.selectPeriod(memberId);
	        System.out.println("applyForVacation 호출됨");  // 호출 여부 확인
	        // 남은 휴가 일수가 부족한지 확인
	        if (remainingVacation < days) {
	            throw new IllegalArgumentException("남은 휴가 일수가 부족합니다.");
	        }

	        // 휴가 신청으로 인한 남은 휴가 일수 업데이트
	        Map<String, Object> params = new HashMap<>();
	        params.put("id", memberId);
	        params.put("days", days);
	        mdao.updateVacationPeriod(params);

	        // 업데이트 후의 남은 휴가 일수 계산
	        remainingVacation -= days;

	        // 결과 반환
	        Map<String, Object> vacationInfo = new HashMap<>();
	        vacationInfo.put("total", 15); // 총 휴가 일수 (고정값)
	        vacationInfo.put("used", 15 - remainingVacation); // 사용한 휴가 일수
	        vacationInfo.put("remaining", remainingVacation); // 남은 휴가 일수

	        return vacationInfo;
	    }

	    public String findIdByEmailAndName(String email, String name) {
	        return mdao.findIdByEmailAndName(email, name);
	    }

	    public String findPwByIdNameAndBirth(String id, String name, String birth) {
	        return mdao.findPwByIdNameAndBirth(id, name, birth);
	    }
	    public boolean verifyUser(String id, String name, String birth) {
	        Map<String, String> params = new HashMap<>();
	        params.put("id", id);
	        params.put("name", name);
	        params.put("birth", birth);

	        return mdao.verifyUser(params);
	    }
	    
	    
	    ////
	    public void updateVacation(String id,int vacation) {
			  mdao.updateVacation(id, vacation);
		 }
	      
	

		
}

