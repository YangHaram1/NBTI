package com.nbti.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nbti.dao.CalendarDAO;

@Service
public class CalendarService {
	@Autowired
	private CalendarDAO dao;
}
