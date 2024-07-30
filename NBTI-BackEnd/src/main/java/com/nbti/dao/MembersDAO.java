package com.nbti.dao;

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
		System.out.println(result);
		if(result!=null) {
			return true;
		}
		return false;
	}
	
	public MembersDTO selectMyData(String id) {
		return mybatis.selectOne("Member.mydata",id);
	}
	
	public void updateMyData(MembersDTO dto) {
		mybatis.update("Member.updateMyData", dto);
	}
	
	public List<MembersDTO> selectAll (){
		return mybatis.selectList("Member.selectAll");
	}
	public void insert(MembersDTO dto) {
		mybatis.insert("Member.insert",dto);
	}

	   public List<Map<String, Object>> getMembers() {
	        return mybatis.selectList("Member.selectMembers");
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


}
