package com.nbti.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nbti.dao.MembersDAO;

@Service
public class MembersService {
	
	@Autowired
	private MembersDAO mdao;

}
