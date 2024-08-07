package com.nbti.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nbti.dto.DocVacationDTO;
import com.nbti.services.DocVacationService;

@RestController
@RequestMapping("/docVacation")
public class DocVacationController {
	
	@Autowired
	private DocVacationService dvServ;
	
	@GetMapping("/{seq}")
	public DocVacationDTO getContent(@PathVariable int seq) {
		System.out.println();
		DocVacationDTO dto = dvServ.getContent(seq);
		return dto;
		
	}

}
