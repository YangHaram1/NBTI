package com.nbti.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nbti.dao.DepartmentDAO;
import com.nbti.dto.DepartmentDTO;

@Service
public class DepartmentService {
	@Autowired
	private DepartmentDAO dDao;
	
	public List<DepartmentDTO> selectDepartment(){
		return dDao.selectDepartment();
	}
}
