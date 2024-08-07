package com.nbti.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nbti.dto.DocLeaveDTO;
import com.nbti.services.DocLeaveService;

@RestController
@RequestMapping("docLeave")
public class DocLeaveController {
	
	@Autowired
	private DocLeaveService dlServ;
	
	@GetMapping("/{seq}")
	public DocLeaveDTO getContent(@PathVariable int seq) {
		DocLeaveDTO dto = dlServ.getContent(seq);
		return dto;
	}

}
