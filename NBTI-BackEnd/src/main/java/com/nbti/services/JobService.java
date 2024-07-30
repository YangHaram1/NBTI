package com.nbti.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nbti.dao.JobDAO;
import com.nbti.dto.JobDTO;

@Service
public class JobService {
	@Autowired
	private JobDAO jDao;
	
	public List<JobDTO> selectJob(){
		return jDao.selectJob();
	}

}
