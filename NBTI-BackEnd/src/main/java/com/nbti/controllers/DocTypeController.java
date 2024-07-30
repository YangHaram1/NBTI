package com.nbti.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nbti.dto.DocSubDTO;
import com.nbti.services.DocTypeService;

@RestController
@RequestMapping("/doctype")
public class DocTypeController {
	
	@Autowired
	private DocTypeService dtServ;
	
	@GetMapping
	public ResponseEntity<List<DocSubDTO>> list(){
		List<DocSubDTO> list = dtServ.selectAll();
		return ResponseEntity.ok(list);
	} 
	
}
