package com.nbti.controllers;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nbti.dto.ApprovalLineDTO;
import com.nbti.dto.ListDocDTO;
import com.nbti.services.ApprovalLineService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/approvalLine")
public class ApprovalLineController {
	
	@Autowired
	private ApprovalLineService alServ;
	@Autowired
	private HttpSession session;
	
	@GetMapping("/{seq}")
	public List<ApprovalLineDTO> getApprovalLine(@PathVariable int seq){
		List<ApprovalLineDTO> list = alServ.getApprovalLine(seq);
		return list;
	}

}
