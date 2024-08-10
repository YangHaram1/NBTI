package com.nbti.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nbti.dto.ReferLineDTO;
import com.nbti.services.ReferLineService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/referLine")
public class ReferLineController {
	
	
	@Autowired
	private HttpSession session;
	
	@Autowired
	private ReferLineService rlServ;
	
	
	@GetMapping("/{seq}")
	public List<ReferLineDTO> getReferLine(@PathVariable int seq){
		List<ReferLineDTO> list = rlServ.getReferLine(seq);
		return list; 
	}
	
	@PutMapping("/read/{seq}")
	public void readCheck(@PathVariable int seq) {
		System.out.println("참조/열람 시 게시글 번호" + seq);
		String id = (String)session.getAttribute("loginID");
		rlServ.readCheak(seq, id);
	}

}
