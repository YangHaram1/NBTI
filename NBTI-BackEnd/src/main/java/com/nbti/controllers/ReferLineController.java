package com.nbti.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nbti.dto.ReferLineDTO;
import com.nbti.services.ReferLineService;

@RestController
@RequestMapping("/referLine")
public class ReferLineController {
	
	@Autowired
	private ReferLineService rlServ;
	
	@GetMapping("/{seq}")
	public List<ReferLineDTO> getReferLine(@PathVariable int seq){
		List<ReferLineDTO> list = rlServ.getReferLine(seq);
		return list; 
	}

}
