package com.nbti.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nbti.dao.VacationCategoryDAO;

@Service
public class VacationCategoryService {
	
	@Autowired
	private VacationCategoryDAO vcdao;
	
	public String getCategoryName(int category) {
		return vcdao.selectCategoryName(category);
	}

}
