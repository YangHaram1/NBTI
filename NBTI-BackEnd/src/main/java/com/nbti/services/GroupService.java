package com.nbti.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nbti.dao.GroupDAO;
import com.nbti.dto.DepartmentDTO;
import com.nbti.dto.GroupDTO;
import com.nbti.dto.TeamsDTO;

@Service
public class GroupService {
	@Autowired
	private GroupDAO dao;
	
	@Transactional
	public List<Map<String, Object>> getGroup() throws Exception{
		List<DepartmentDTO> dlist=new ArrayList<>();
		List<TeamsDTO> tlist =new ArrayList<>();
		List<GroupDTO> glist=new ArrayList<>();
		//{부서,{{팀,{멤버}},{팀,{멤버}}}},
		dlist=dao.getDepartmentAll(); //부서 리스트 
		List<Map<String, Object>> deptList= new ArrayList<>();
		for (DepartmentDTO dto : dlist) {
			Map<String, Object> result= new HashMap<>();
			result.put("dept", dto.getDept_name());	
			tlist=dao.getTeamByDeftCode(dto.getDept_code()); //팀 리스트
			List<Map<String, Object>> teamList= new ArrayList<>();
			for (TeamsDTO teamsDTO : tlist) {//팀에 맞는 멤버 뽑기
				Map<String, Object> team= new HashMap<>();
				team.put("name", teamsDTO.getTeam_name());
				glist=dao.getMemberByTeamcode(teamsDTO.getTeam_code());
				team.put("members", glist);
				teamList.add(team);
			}
			result.put("teams", teamList);
			deptList.add(result);
		}
		
		return deptList;
	}

}
