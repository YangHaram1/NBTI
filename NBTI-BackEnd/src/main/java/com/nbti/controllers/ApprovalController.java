package com.nbti.controllers;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nbti.dto.ApprovalDTO;
import com.nbti.dto.ApprovalLineDTO;
import com.nbti.dto.DocDraftDTO;
import com.nbti.dto.DocLeaveDTO;
import com.nbti.dto.DocVacationDTO;
import com.nbti.dto.ListDocDTO;
import com.nbti.dto.ReferLineDTO;
import com.nbti.services.ApprovalLineService;
import com.nbti.services.ApprovalService;
import com.nbti.services.FilesService;
import com.nbti.services.ReferLineService;

import jakarta.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;



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
	private FilesService fServ;
	@Autowired
	private HttpSession session;
	
	@PostMapping
	public ResponseEntity<Void> approval(@RequestPart("requestData") String requestData, @RequestPart(value="files",required = false) MultipartFile[] files) {
		
		System.out.println("문서저장");
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		
		ObjectMapper objectMapper = new ObjectMapper();
	    Map<String, Object> requestDataMap;
	    try {
	        requestDataMap = objectMapper.readValue(requestData, Map.class);
	    } catch (IOException e) {
	        e.printStackTrace();
	        return ResponseEntity.badRequest().build();
	    }
		
		int docType = (int)requestDataMap.get("docType");
		boolean emergency = (boolean)requestDataMap.get("emergency");
//		System.out.println("Received: " + requestData);
//		System.out.println(docType +":"+ emergency);
		
		DocDraftDTO ddto = new DocDraftDTO();
		DocVacationDTO dvdto = new DocVacationDTO();
		DocLeaveDTO dldto = new DocLeaveDTO();
		
		
		// 각 객체 배열 변수에 저장하기
		
		// 결제라인 (결재자 id, 이름, 순서 = 1,2,3)
        List<Map<String, Object>> approvalLine = (List<Map<String, Object>>) requestDataMap.get("approvalLine");
        // 참조라인 (참조자 id, 이름, 순서 = 4)
        List<Map<String, Object>> referLine = (List<Map<String, Object>>) requestDataMap.get("referLine");
//        System.out.println("Received approvalLine: " + approvalLine);
//	    System.out.println("Received referLine: " + referLine);
//        System.out.println("Received requestData" + requestData);
        
        // 업무 기안서 데이터 저장
		if(docType == 1) {
			
			// 작성날자, 협조부서, 제목, 내용
			Map<String, Object> docData = (Map<String, Object>) requestDataMap.get("docDraft");
//		    System.out.println("Received docData: " + docData);
		    String date = (String)docData.get("effective_date");
		    
			// 시행 일자 String -> timestamp 변환 및 DTO 저장
			try {
				sdf.parse(date);
				Date result = sdf.parse(date);
				long parseTime = result.getTime();
				
				// 업무기안서 문서 저장
				// 필요데이터 : 임시번호, 시행일자, 협조부서, 제목, 내용
				
	            ddto.setTitle((String) docData.get("title"));
	            ddto.setEffective_date(new java.sql.Timestamp(parseTime));
	            ddto.setContent((String) docData.get("content"));
	            ddto.setCooperation_dept((String) docData.get("cooperation_dept"));
//	            System.out.println(ddto.getEffective_date());
				
			}catch(Exception e) {
				e.printStackTrace();
				 return ResponseEntity.badRequest().build();
			}
		    
		// 휴가 신청서 데이터 저장    
		}else if(docType == 3) {
			Map<String, Object> docVacation = (Map<String, Object>) requestDataMap.get("docVacation");
//		    System.out.println("Received docVacation: " + docVacation);
		    
		    try {
		        // 휴가 종류
		        if (docVacation.get("category") != null) {
		        	 int category = Integer.parseInt(docVacation.get("category").toString());
//		            System.out.println(category);
		            dvdto.setVacation_category(category);
		        } else {
		            throw new IllegalArgumentException("Category cannot be null");
		        }

		        // 휴가 시작 날짜
		        if (docVacation.get("start") != null) {
		            String start = (String) docVacation.get("start");
		            Date startDate = sdf.parse(start);
		            long startTime = startDate.getTime();
		            dvdto.setVacation_start(new java.sql.Timestamp(startTime));
		        } else {
		            throw new IllegalArgumentException("Start date cannot be null");
		        }

		        // 휴가 종료 날짜
		        if (docVacation.get("end") != null) {
		            String end = (String) docVacation.get("end");
		            Date endDate = sdf.parse(end);
		            long endTime = endDate.getTime();
		            dvdto.setVacation_end(new java.sql.Timestamp(endTime));
		        } else {
//		            throw new IllegalArgumentException("End date cannot be null");
		        }

		        // 휴가 반차
		        if (docVacation.get("halfStart") != null) {
		            boolean halfStart = (boolean) docVacation.get("halfStart");
		            dvdto.setStart_half(String.valueOf(halfStart));
		        } else {
		            dvdto.setStart_half("false");
		        }

		        if (docVacation.get("halfEnd") != null) {
		            boolean halfEnd = (boolean) docVacation.get("halfEnd");
		            dvdto.setEnd_half(String.valueOf(halfEnd));
		        } else {
		            dvdto.setEnd_half("false");
		        }

		        if (docVacation.get("halfStartAP") != null) {
		            dvdto.setStart_half_ap((String) docVacation.get("halfStartAP"));
		        } else {
		            dvdto.setStart_half_ap("");
		        }

		        if (docVacation.get("halfEndAP") != null) {
		            dvdto.setEnd_half_ap((String) docVacation.get("halfEndAP"));
		        } else {
		            dvdto.setEnd_half_ap("");
		        }

//		        System.out.println("정보출력 : " + dvdto.getVacation_category() + ":" + dvdto.getVacation_start() + ":" + dvdto.getVacation_end() + ":" + dvdto.getStart_half() + ":" + dvdto.getStart_half_ap() + ":" + dvdto.getEnd_half() + ":" + dvdto.getEnd_half_ap());

		    } catch(Exception e) {
		        e.printStackTrace();
		        System.out.println("삐용삐용 작성 중 오류 발생 1");
		    }
			
		// 휴직 신청서 데이터 저장	
		}else if(docType == 2) {
			Map<String, Object> docLeave = (Map<String, Object>) requestDataMap.get("docLeave");
//			System.out.println("Received docLeave: " + docLeave);
			
			try {
				// 휴직 시작 날짜
				String start = (String)docLeave.get("start");
				sdf.parse(start);
				Date result = sdf.parse(start);
				long parseStartTime = result.getTime();
				dldto.setLeave_start(new java.sql.Timestamp(parseStartTime));
				// 휴직 복귀 날짜
				String end = (String)docLeave.get("end");
				sdf.parse(end);
				Date endresult = sdf.parse(end);
				long parseEndTime = endresult.getTime();
				dldto.setLeave_end(new java.sql.Timestamp(parseEndTime));
				// 휴직 사유
				dldto.setAddress((String)docLeave.get("address"));
				dldto.setLeave_reason((String)docLeave.get("reason"));
				dldto.setPhone((String)docLeave.get("phone"));
//				System.out.println(dldto.getAddress() +":"+ dldto.getLeave_reason() +":"+ dldto.getLeave_start()+":"+dldto.getLeave_end()+":"+dldto.getPhone());
				
			}catch(Exception e) {
				e.printStackTrace();
				System.out.println("삐용삐용 작성 중 오류 발생 2");
			}
			
		}
		
		// 결재 공통 정보 저장
		// 필요 데이터 : 임시번호(seq.nextval), 작성자 아이디, 작성일자(sysdate), 문서타입, 긴급유무, 취소유무, 결재승인번호(null), 문서상태코드(w) 
		ApprovalDTO adto =new ApprovalDTO();
		String id = (String)session.getAttribute("loginID");
		adto.setMember_id(id);
		adto.setDoc_sub_seq(docType);
		adto.setDoc_state_code("i");
		adto.setCancle_yn("n");
		if(emergency) {
			adto.setEmergency("Y");
		}else {adto.setEmergency("N");}
		
		
		// 각 라인별 temp_seq는 서비스에서 받기
		List<ReferLineDTO> referline = new ArrayList<>();
		 for (Map<String, Object> map : referLine) {
	            ReferLineDTO dto = new ReferLineDTO();
	            dto.setReferer((String) map.get("id")); // id를 referer로 사용
	            referline.add(dto);
	        }
		 
		 List<ApprovalLineDTO> approvalline = new ArrayList<>();
		 for (Map<String, Object> map : approvalLine) {
			 ApprovalLineDTO dto = new ApprovalLineDTO();
	            dto.setApproval_id((String) map.get("id")); // 
	            int order = Integer.parseInt((String)map.get("order"));
	            if(order == 1) {
	            	dto.setMember_state_code("w");
	            }else {
	            	dto.setMember_state_code("b");
	            }
	            dto.setApproval_order(order);
	            approvalline.add(dto);
	        }
		 
		 if(files != null) {
		 for (MultipartFile file : files) {
	            // Process each file (save, validate, etc.)
	            String filename = file.getOriginalFilename();
	            System.out.println("파일 이름 출력 : " + filename);
	            // Save file to disk or database
	        }
		 }
		
		fServ.write(docType, adto, approvalline, referline, ddto, dvdto, dldto, files);
		
		return ResponseEntity.ok().build();
	}
	
	@PostMapping("/tempSave")
	public ResponseEntity<Void> tempSave(@RequestBody String requestData) {
		
		System.out.println("임시저장 시작");
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		
		ObjectMapper objectMapper = new ObjectMapper();
	    Map<String, Object> requestDataMap;
	    try {
	        requestDataMap = objectMapper.readValue(requestData, Map.class);
	    } catch (IOException e) {
	        e.printStackTrace();
	        return ResponseEntity.badRequest().build();
	    }
		
		int docType = (int)requestDataMap.get("docType");
		boolean emergency = (boolean)requestDataMap.get("emergency");
//		System.out.println("Received: " + requestData);
//		System.out.println(docType +":"+ emergency);
		
		DocDraftDTO ddto = new DocDraftDTO();
		DocVacationDTO dvdto = new DocVacationDTO();
		DocLeaveDTO dldto = new DocLeaveDTO();
		
		
		// 각 객체 배열 변수에 저장하기
		
		// 결제라인 (결재자 id, 이름, 순서 = 1,2,3)
        List<Map<String, Object>> approvalLine = (List<Map<String, Object>>) requestDataMap.get("approvalLine");
        // 참조라인 (참조자 id, 이름, 순서 = 4)
        List<Map<String, Object>> referLine = (List<Map<String, Object>>) requestDataMap.get("referLine");
//        System.out.println("Received approvalLine: " + approvalLine);
//	    System.out.println("Received referLine: " + referLine);
//        System.out.println("Received requestData" + requestData);
        
        // 업무 기안서 데이터 저장
		if(docType == 1) {
			
			// 작성날자, 협조부서, 제목, 내용
			Map<String, Object> docData = (Map<String, Object>) requestDataMap.get("docDraft");
//		    System.out.println("Received docData: " + docData);
		    
			// 시행 일자 String -> timestamp 변환 및 DTO 저장
			try {
				if((String)docData.get("effective_date") != "") {
				String date = (String)docData.get("effective_date");
				sdf.parse(date);
				Date result = sdf.parse(date);
				long parseTime = result.getTime();
				ddto.setEffective_date(new java.sql.Timestamp(parseTime));
				}
				// 업무기안서 문서 저장
				// 필요데이터 : 임시번호, 시행일자, 협조부서, 제목, 내용
				
	            ddto.setTitle((String) docData.get("title"));
	            ddto.setContent((String) docData.get("content"));
	            ddto.setCooperation_dept((String) docData.get("cooperation_dept"));
//	            System.out.println(ddto.getEffective_date());
				
			}catch(Exception e) {
				e.printStackTrace();
				 return ResponseEntity.badRequest().build();
			}
		    
		// 휴가 신청서 데이터 저장    
		}else if(docType == 3) {
			Map<String, Object> docVacation = (Map<String, Object>) requestDataMap.get("docVacation");
//		    System.out.println("Received docVacation: " + docVacation);
		    
		    try {
		        // 휴가 종류
		        if (docVacation.get("category") != null) {
		        	 int category = Integer.parseInt(docVacation.get("category").toString());
//		            System.out.println(category);
		            dvdto.setVacation_category(category);
		        } else {
//		            throw new IllegalArgumentException("Category cannot be null");
		        }

		        // 휴가 시작 날짜
		        if (docVacation.get("start") != null) {
		            String start = (String) docVacation.get("start");
		            Date startDate = sdf.parse(start);
		            long startTime = startDate.getTime();
		            dvdto.setVacation_start(new java.sql.Timestamp(startTime));
		        } else {
//		        	dvdto.setVacation_start(null);
//		            throw new IllegalArgumentException("Start date cannot be null");
		        }

		        // 휴가 종료 날짜
		        if (docVacation.get("end") != null) {
		            String end = (String) docVacation.get("end");
		            Date endDate = sdf.parse(end);
		            long endTime = endDate.getTime();
		            dvdto.setVacation_end(new java.sql.Timestamp(endTime));
		        } else {
//		            throw new IllegalArgumentException("End date cannot be null");
		        }

		        // 휴가 반차
		        if (docVacation.get("halfStart") != null) {
		            boolean halfStart = (boolean) docVacation.get("halfStart");
		            dvdto.setStart_half(String.valueOf(halfStart));
		        } else {
		            dvdto.setStart_half("false");
		        }

		        if (docVacation.get("halfEnd") != null) {
		            boolean halfEnd = (boolean) docVacation.get("halfEnd");
		            dvdto.setEnd_half(String.valueOf(halfEnd));
		        } else {
		            dvdto.setEnd_half("false");
		        }

		        if (docVacation.get("halfStartAP") != "") {
		        	System.out.println(docVacation.get("halfStartAP"));
		        	System.out.println("halfStartAP is not null");
		            dvdto.setStart_half_ap((String) docVacation.get("halfStartAP"));
		        } else {
		        	System.out.println("halfStartAP is null");
		            dvdto.setStart_half_ap("n");
		        }

		        if (docVacation.get("halfEndAP") != "") {
		        	System.out.println("halfEndAP is not null");
		            dvdto.setEnd_half_ap((String) docVacation.get("halfEndAP"));
		        } else {
		        	System.out.println("halfEndAP is null");
		            dvdto.setEnd_half_ap("n");
		        }

		        System.out.println("정보출력 : " + dvdto.getVacation_category() + ":" + dvdto.getVacation_start() + ":" + dvdto.getVacation_end() + ":" + dvdto.getStart_half() + ":" + dvdto.getStart_half_ap() + ":" + dvdto.getEnd_half() + ":" + dvdto.getEnd_half_ap());

		    } catch(Exception e) {
		        e.printStackTrace();
		        System.out.println("삐용삐용 작성 중 오류 발생 1");
		    }
			
		// 휴직 신청서 데이터 저장	
		}else if(docType == 2) {
			Map<String, Object> docLeave = (Map<String, Object>) requestDataMap.get("docLeave");
//			System.out.println("Received docLeave: " + docLeave);
			
			try {
				if((String)docLeave.get("start") != null) {
				// 휴직 시작 날짜
				String start = (String)docLeave.get("start");
				sdf.parse(start);
				Date result = sdf.parse(start);
				long parseStartTime = result.getTime();
				dldto.setLeave_start(new java.sql.Timestamp(parseStartTime));
				// 휴직 복귀 날짜
				}
				if((String)docLeave.get("end") != null) {
				String end = (String)docLeave.get("end");
				sdf.parse(end);
				Date endresult = sdf.parse(end);
				long parseEndTime = endresult.getTime();
				dldto.setLeave_end(new java.sql.Timestamp(parseEndTime));
				// 휴직 사유
				dldto.setAddress((String)docLeave.get("address"));
				dldto.setLeave_reason((String)docLeave.get("reason"));
				dldto.setPhone((String)docLeave.get("phone"));
//				System.out.println(dldto.getAddress() +":"+ dldto.getLeave_reason() +":"+ dldto.getLeave_start()+":"+dldto.getLeave_end()+":"+dldto.getPhone());
				}
			}catch(Exception e) {
				e.printStackTrace();
				System.out.println("삐용삐용 작성 중 오류 발생 2");
			}
			
		}
		
		// 결재 공통 정보 저장
		// 필요 데이터 : 임시번호(seq.nextval), 작성자 아이디, 작성일자(sysdate), 문서타입, 긴급유무, 취소유무, 결재승인번호(null), 문서상태코드(w) 
		ApprovalDTO adto =new ApprovalDTO();
		String id = (String)session.getAttribute("loginID");
		adto.setMember_id(id);
		adto.setDoc_sub_seq(docType);
		adto.setDoc_state_code("t");
		adto.setCancle_yn("n");
		if(emergency) {
			adto.setEmergency("Y");
		}else {adto.setEmergency("N");}
		
		
		// 각 라인별 temp_seq는 서비스에서 받기
		List<ReferLineDTO> referline = new ArrayList<>();
		 for (Map<String, Object> map : referLine) {
	            ReferLineDTO dto = new ReferLineDTO();
	            dto.setReferer((String) map.get("id")); // id를 referer로 사용
	            referline.add(dto);
	        }
		 
		 List<ApprovalLineDTO> approvalline = new ArrayList<>();
		 for (Map<String, Object> map : approvalLine) {
			 ApprovalLineDTO dto = new ApprovalLineDTO();
	            dto.setApproval_id((String) map.get("id")); // 
	            int order = Integer.parseInt((String)map.get("order"));
	            if(order == 1) {
	            	dto.setMember_state_code("w");
	            }else {
	            	dto.setMember_state_code("b");
	            }
	            dto.setApproval_order(order);
	            approvalline.add(dto);
	        }
		 
		aServ.write(docType, adto, approvalline, referline, ddto, dvdto, dldto);
		
		return ResponseEntity.ok().build();
	}
	
	
	
	// 기안 문서함 목록 출력
	@GetMapping("/getWriterIsMe")
	public List<ListDocDTO> getWriterIsMe() {
		String id = (String)session.getAttribute("loginID");
		List<ListDocDTO> list = aServ.getWriterIsMe(id);		
		return list;
	}
	
	// 참조/열람 문서함 목록 출력
	@GetMapping("/getReferIsMe")
	public List<ListDocDTO> getReferIsMe(){	
		String id = (String)session.getAttribute("loginID");
		List<ListDocDTO> list = aServ.getReferIsMe(id);
		return list;
	}
	
	// 결재 문서함 목록 출력
	@GetMapping("/getApprovalIsMe")
	public List<ListDocDTO> getApprovalIsMe(){
		String id = (String)session.getAttribute("loginID");
		List<ListDocDTO> list = aServ.getApprovalIsMe(id);
		return list;
	}
	
	// 반려 문서함 목록 출력
	@GetMapping("/getReturn")
	public List<ListDocDTO> getReturn(){
		String id = (String)session.getAttribute("loginID");
		List<ListDocDTO> list = aServ.getReturn(id);
		return list;
	}
	
	// 상신 취소 문서함 목록 출력
	@GetMapping("/getCancle")
	public List<ListDocDTO> getCancle() {
		String id = (String)session.getAttribute("loginID");
		List<ListDocDTO> list = aServ.getCancle(id);
		return list;
	}
	
	
	// 결재 대기 목록 출력
	@GetMapping("/getApprovalWait")
	public List<ListDocDTO> getApprovalWait(){
		String id = (String)session.getAttribute("loginID");
		List<ListDocDTO> list = aServ.getApprovalWait(id);
		return list;
	}
	
	// 결재 예정 목록 출력
	@GetMapping("/getApprovalBook")
	public List<ListDocDTO> getApprovalBook(){
		String id = (String)session.getAttribute("loginID");
		List<ListDocDTO> list = aServ.getApprovalBook(id);
		return list;
	}
	
	// 참조/열람 목록 출력 (결재하기)
	@GetMapping("/getReferIsMeWait")
	public List<ListDocDTO> getReferIsMeWait(){
		String id = (String)session.getAttribute("loginID");
		List<ListDocDTO> list = aServ.getReferIsMeWait(id);
		return list;
	}
	
	// 참조/열람 목록 출력 (결재하기)
	@GetMapping("/getTemp")
	public List<ListDocDTO> getTemp(){
		String id = (String)session.getAttribute("loginID");
		List<ListDocDTO> list = aServ.getTemp(id);
		return list;
	}
	
	// 디테일 공통 데이터 출력
	@GetMapping("/{seq}")
	public ApprovalDTO getApproval(@PathVariable int seq){
		ApprovalDTO dto = aServ.getApproval(seq);
		return dto; 
	}
	
	// 상신 취소 
	@PutMapping("/cancleByMe/{seq}")
	public ResponseEntity<Void> cancleByMe(@PathVariable int seq) {
		aServ.cancleByMe(seq);
		System.out.println("문서 상신 취소");
		return ResponseEntity.ok().build();
	}

}
