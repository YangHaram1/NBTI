package com.nbti.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nbti.dao.TeamsDAO;
import com.nbti.dto.TeamsDTO;

@Service
public class TeamService {
	@Autowired
	private TeamsDAO tdao;
	
	public List<TeamsDTO> selectTeams(){
		return tdao.selectTeams();
	}
}
