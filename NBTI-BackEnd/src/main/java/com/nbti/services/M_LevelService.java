package com.nbti.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nbti.dao.M_LevelDAO;
import com.nbti.dto.M_LevelDTO;

@Service
public class M_LevelService {
	@Autowired
	private M_LevelDAO ldao;
	public List<M_LevelDTO> selectLevel (){
		return ldao.selectLevel();
	}
}
