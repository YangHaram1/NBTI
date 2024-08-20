package com.nbti.dao;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nbti.dto.MembersDTO;

@Repository
public class MembersDAO {
	
	@Autowired
	private SqlSession mybatis;
	
public boolean login(MembersDTO dto) {
		String result =mybatis.selectOne("Member.login",dto);
		if(result!=null) {
			return true;
		}
		return false;
	}
	public void updateUser(MembersDTO dto) {
		mybatis.update("Member.updateMember",dto);
	}
	public List<Map<String, Object>> searchUser(String name) {
	    System.out.println("검색어: " + name);
	    return mybatis.selectList("Member.searchUser", name);
	}
	
	public MembersDTO selectMyData(String id) {
		
		return mybatis.selectOne("Member.mydata",id);
	}
	
	public void updateMyData(MembersDTO dto) {
		mybatis.update("Member.updateMyData", dto);
	}
	
	public void updateMyDataNoImg(MembersDTO dto) {
		mybatis.update("Member.updateMyDataNoImg", dto);
	}
	
	public List<MembersDTO> selectAll (){
		return mybatis.selectList("Member.selectAll");
	}
	public void deleteUser(String id) {
		mybatis.delete("Member.deleteUser",id);
	}
	public void insert(MembersDTO dto) {
		mybatis.insert("Member.insert",dto);
	}

	   public List<Map<String, Object>> getMembers() {
	        return mybatis.selectList("Member.selectMembers");
	    }
	   
	   public List<MembersDTO> selectByTeam(String team_code){
		   return mybatis.selectList("Member.selectByTeam",team_code);
	   }
	
	public boolean checkPw(HashMap<String, String> map) {
		return mybatis.selectOne("Member.checkPw",map);
	}

	
	public boolean changePw(HashMap<String, String> map) {
		int result = mybatis.update("Member.changePw",map);
		if(result > 0) {
			return true;
		}else {return false;}
	}
	
	public Timestamp selectChangeDate(String id) {
		return mybatis.selectOne("Member.selectChangeDate",id);
	}
	
	// 팀 코드에 의한 사용자 검색
	public List<Map<String, Object>> searchMembers(String team){
		return mybatis.selectList("Member.searchMembers",team);
	}
	
	// 아이디에 따른 이름, 팀코드, 팀명, 부서코드, 부서명, 관리자 권한 코드, 관리자 권한명 추출
	public Map<String, Object> memberData(String id){
		return mybatis.selectOne("Member.memberData", id);
	}

	public int selectPeriod(String id) {
		int result = mybatis.selectOne("Member.selectPeriod",id);
		return result;
	}
	
	
	//채팅관련 멤버아디로 네임 뽑기
	public List<MembersDTO> chatMembersName(List<String> list){
		return mybatis.selectList("Member.chatMembersName",list);
	}
	
	public String getMemberName(String id) {
		return mybatis.selectOne("Member.getMemberName",id);
	}


    public void updateVacationPeriod(Map<String, Object> params) {
          mybatis.update("Member.updateVacationPeriod", params);
          System.out.println("ㄴㅇㄹㄴㅇㄹ");
      }

      public String findIdByEmailAndName(String email, String name) {
          Map<String, Object> param = new HashMap<>();
          param.put("email", email);
          param.put("name", name);
          return mybatis.selectOne("Member.findIdByEmailAndName", param);
      }
      
      public String findPwByIdNameAndBirth(String id, String name, String birth) {
          Map<String, Object> param = new HashMap<>();
          param.put("id", id);
          param.put("name", name);
          param.put("birth", birth);
          return mybatis.selectOne("Member.findPwByIdNameAndBirth", param);
      }
      
      public boolean verifyUser(Map<String, String> params) {
          Integer result = mybatis.selectOne("Member.verifyUser", params);
          return result != null && result > 0; // 사용자가 존재하면 true 반환
      }
}
