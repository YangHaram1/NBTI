package com.nbti.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nbti.dto.DocDraftDTO;
import com.nbti.services.DocDraftService;

@RestController
@RequestMapping("/docDraft")
public class DocDraftController {
	
	@Autowired
	private DocDraftService dServ;
	
	@GetMapping("/{seq}")
	public DocDraftDTO getContent(@PathVariable int seq) {
		DocDraftDTO dto = dServ.getContent(seq);
		return dto;
	}

}
