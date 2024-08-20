package com.nbti.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nbti.services.ReportBoardService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/reportBoard")
public class ReportBoardController {

	@Autowired
	private ReportBoardService rserv;
	@Autowired
	private HttpSession session;
	
	
	
	

}
