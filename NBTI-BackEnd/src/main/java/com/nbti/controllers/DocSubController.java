package com.nbti.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nbti.dto.BoardDTO;
import com.nbti.dto.DocSubDTO;
import com.nbti.services.DocSubService;

@RestController
@RequestMapping("/docsub")
public class DocSubController {
	
	@Autowired
	private DocSubService dsServ;
	
//	@GetMapping
//	public ResponseEntity<List<DocSubDTO>> list(){
//		List<DocSubDTO> list = dsServ.selectAll();
//		return ResponseEntity.ok(list);
//	} 
	
	
	
}
