package com.nbti.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nbti.dao.ReservationDAO;

@Service
public class ReservationService {
	@Autowired
	private ReservationDAO dao;
}
