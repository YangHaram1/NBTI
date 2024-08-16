package com.nbti.controllers;

import java.util.List;

import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nbti.dto.ApprovalLineDTO;
import com.nbti.dto.ListDocDTO;
import com.nbti.dto.MembersDTO;
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
	public List<Map<String,Object>> getApprovalLine(@PathVariable int seq){
		List<Map<String,Object>> list = alServ.getApprovalLine(seq);
		return list;
	}
	
	@PutMapping("/insertComment")
	public ResponseEntity<Void> insertComment(@RequestBody Map<String, Object> map){
		
		String id = (String)session.getAttribute("loginID");
		int temp_seq = (int)map.get("temp_seq");
		String comment = (String)map.get("comment");
		String approvalYN = (String)map.get("approvalYN");
		String setlist = (String)map.get("setlist");
		String state="";
		
		if(approvalYN.equals("결재승인")) {
			state = "p";
		} else {
			state="r";
		}
		
		map.put("approvalYN",state);
		map.put("id", id);
		System.out.println("temp_seq: " +temp_seq);
		System.out.println("setlist: " + setlist);
		System.out.println(approvalYN +":"+id+":"+temp_seq+":"+comment+":"+state);
//		 본인 결재라인 업데이트
		alServ.updateMyLine(map);
		
		// 다음 결재라인 업데이트
		alServ.updateNextLine(map);
		
		return ResponseEntity.ok().build();
	}

}
