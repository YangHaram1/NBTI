package com.nbti.controllers;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nbti.dto.ApprovalDTO;
import com.nbti.dto.DocDraftDTO;
import com.nbti.services.ApprovalService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/approval")
public class ApprovalController {

	@Autowired
	private ApprovalService aServ;
	
	@PostMapping
	public ResponseEntity<Void> Approval(@RequestBody Map<String, Object>  requestData) {
		
		Map<String, Object> docData = (Map<String, Object>) requestData.get("docData");
        List<Map<String, Object>> approvalLine = (List<Map<String, Object>>) requestData.get("approvalLine");
        List<Map<String, Object>> referLine = (List<Map<String, Object>>) requestData.get("referLine");

	    System.out.println("Received docData: " + docData);
	    System.out.println("Received approvalLine: " + approvalLine);
	    System.out.println("Received referLine: " + referLine);
		
		String date = (String)docData.get("effective_date");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		
		ApprovalDTO adto =new ApprovalDTO();
		
		boolean emergency = (boolean)docData.get("emergency");
		if(emergency) {
			adto.setEmergency("Y");
		}else {adto.setEmergency("N");}
		
		
		
		try {
			sdf.parse(date);
			Date result = sdf.parse(date);
			long parseTime = result.getTime();
			System.out.println(parseTime);
			
			DocDraftDTO ddto = new DocDraftDTO();
            ddto.setTitle((String) docData.get("title"));
            ddto.setEffective_date(new java.sql.Timestamp(parseTime));
            ddto.setContent((String) docData.get("content"));
            ddto.setCooperation_dept((String) docData.get("cooperation_dept"));
            
            System.out.println(ddto.getEffective_date());
			
		}catch(Exception e) {
			e.printStackTrace();
			 return ResponseEntity.badRequest().build();
		}
		
		return ResponseEntity.ok().build();
	}
	
	
	
}
