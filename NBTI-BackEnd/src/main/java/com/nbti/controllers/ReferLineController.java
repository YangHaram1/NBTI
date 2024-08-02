package com.nbti.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nbti.services.ReferLineService;

@RestController
@RequestMapping("/referLine")
public class ReferLineController {
	
	@Autowired
	private ReferLineService rlServ;

}
