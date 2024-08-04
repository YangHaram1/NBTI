package com.nbti.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nbti.services.FilesService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/files")
public class FilesController {
	
	@Autowired
	private HttpSession session;
	@Autowired
	private FilesService serv;
	
	
}
