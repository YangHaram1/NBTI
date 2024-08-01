package com.nbti.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nbti.services.DocDraftService;

@RestController
@RequestMapping("/docDraft")
public class DocDraftController {
	
	@Autowired
	private DocDraftService dserv;

}
