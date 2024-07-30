package com.nbti.dao;

import java.util.HashMap;
import java.util.List;

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
		System.out.println("id:"+dto.getId());
		System.out.println("pw:"+dto.getPw());
		System.out.println("name:"+dto.getName());
		System.out.println("email:"+dto.getEmail());
		System.out.println("team:"+dto.getTeam_code());
		System.out.println("birth:"+dto.getBirth());
		System.out.println("add:"+dto.getAddress());
		System.out.println("job:"+dto.getJob_code());
		System.out.println("gen"+dto.getGender());
		System.out.println("enter:"+dto.getEnter_date());
		System.out.println("period"+dto.getVacation_period());
		System.out.println("level:"+dto.getMember_level());
		System.out.println("call:"+dto.getMember_call());
		System.out.println("yn:"+dto.getEnt_yn());
		System.out.println("enddate"+dto.getEnd_date());
		
		mybatis.insert("Member.insert",dto);
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
