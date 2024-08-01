package com.nbti.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nbti.dao.DocDraftDAO;

@Service
public class DocDraftService {
	
	@Autowired
	private DocDraftDAO ddao;
	

}
