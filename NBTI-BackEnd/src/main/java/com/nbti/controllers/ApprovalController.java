package com.nbti.controllers;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nbti.dto.ApprovalDTO;
import com.nbti.dto.ApprovalLineDTO;
import com.nbti.dto.DocDraftDTO;
import com.nbti.dto.ReferLineDTO;
import com.nbti.services.ApprovalLineService;
import com.nbti.services.ApprovalService;
import com.nbti.services.ReferLineService;

import jakarta.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/approval")
public class ApprovalController {

	@Autowired
	private ApprovalService aServ;
	@Autowired
	private ApprovalLineService alServ;
	@Autowired
	private ReferLineService flServ;
	
	@Autowired
	private HttpSession session;
	
	@PostMapping
	public ResponseEntity<Void> Approval(@RequestBody Map<String, Object>  requestData) {
		
		
		// 각 객체 배열 변수에 저장하기
		// 작성날자, 협조부서, 제목, 내용, 긴급 유무, 문서타입
		Map<String, Object> docData = (Map<String, Object>) requestData.get("docDraft");
		// 결제라인 (결재자 id, 이름, 순서 = 1,2,3)
        List<Map<String, Object>> approvalLine = (List<Map<String, Object>>) requestData.get("approvalLine");
        // 참조라인 (참조자 id, 이름, 순서 = 4)
        List<Map<String, Object>> referLine = (List<Map<String, Object>>) requestData.get("referLine");

	    System.out.println("Received docData: " + docData);
	    System.out.println("Received approvalLine: " + approvalLine);
	    System.out.println("Received referLine: " + referLine);
		
		String date = (String)docData.get("effective_date");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		
		// 결재 공통 정보 저장
		// 필요 데이터 : 임시번호(seq.nextval), 작성자 아이디, 작성일자(sysdate), 문서타입, 긴급유무, 취소유무, 결재승인번호(null), 문서상태코드(w) 
		ApprovalDTO adto =new ApprovalDTO();
		String id = (String)session.getAttribute("loginID");
		adto.setMember_id(id);
		adto.setDoc_sub_seq((int)docData.get("docType"));
		adto.setDoc_state_code("w");
		adto.setCancle_yn("n");
		
		// 긴급 유무 Y/N 변환 및 DTO 저장
		boolean emergency = (boolean)docData.get("emergency");
		if(emergency) {
			adto.setEmergency("Y");
		}else {adto.setEmergency("N");}
			
		// 시행 일자 String -> timestamp 변환 및 DTO 저장
		try {
			sdf.parse(date);
			Date result = sdf.parse(date);
			long parseTime = result.getTime();
			
			// 업무기안서 문서 저장
			// 필요데이터 : 임시번호, 시행일자, 협조부서, 제목, 내용
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
		
		int temp_seq = aServ.write(adto);
		// 참조 라인 DTO 저장 => select key로 임시번호 받아오기
		// 결재 라인 DTO 저장 => select key로 임시번호 받아오기
		List<ReferLineDTO> referline = new ArrayList<>();
		 for (Map<String, Object> map : referLine) {
	            ReferLineDTO dto = new ReferLineDTO();
	            dto.setTemp_seq(temp_seq); // temp_seq는 기본값 설정, 필요시 적절히 변경
	            dto.setReferer((String) map.get("id")); // id를 referer로 사용
	            referline.add(dto);
	        }
		 
		 List<ApprovalLineDTO> approvalline = new ArrayList<>();
		 for (Map<String, Object> map : approvalLine) {
			 ApprovalLineDTO dto = new ApprovalLineDTO();
	            dto.setTemp_seq(temp_seq); // temp_seq는 기본값 설정, 필요시 적절히 변경
	            dto.setApproval_id((String) map.get("id")); // id를 referer로 사용
	            int order = Integer.parseInt((String)map.get("order"));
	            if(order == 1) {
	            	dto.setMember_state_code("w");
	            }else {
	            	dto.setMember_state_code("b");
	            }
	            dto.setApproval_order(order);
	            approvalline.add(dto);
	        }
		
		 flServ.insert(referline);
		 alServ.insert(approvalline);
		
		
		return ResponseEntity.ok().build();
	}
	
	
	
}
