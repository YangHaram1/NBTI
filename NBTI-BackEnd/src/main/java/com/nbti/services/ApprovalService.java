package com.nbti.services;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nbti.dao.ApprovalDAO;
import com.nbti.dao.ApprovalLineDAO;
import com.nbti.dao.DocDraftDAO;
import com.nbti.dao.DocLeaveDAO;
import com.nbti.dao.DocVacationDAO;
import com.nbti.dao.ReferLineDAO;
import com.nbti.dto.ApprovalDTO;
import com.nbti.dto.ApprovalLineDTO;
import com.nbti.dto.DocDraftDTO;
import com.nbti.dto.DocLeaveDTO;
import com.nbti.dto.DocVacationDTO;
import com.nbti.dto.ListDocDTO;
import com.nbti.dto.ReferLineDTO;

@Service
public class ApprovalService {
	
	@Autowired
	private ApprovalDAO adao;
	
	@Autowired
	private DocDraftDAO dddao;
	
	@Autowired
	private DocVacationDAO dvdao;
	
	@Autowired
	private DocLeaveDAO dldao;
	
	@Autowired
	private ApprovalLineDAO aldao;
	
	@Autowired
	private ReferLineDAO rldao;
	
	// 기안문서(문서함)
	public List<ListDocDTO> getWriterIsMe(Map<String, Object> map) {
		return adao.selectWriterIsMe(map);
	}
	
	// 참조문서(문서함)
	public List<ListDocDTO> getReferIsMe(Map<String, Object> map){
		return adao.selectReferIsMe(map);
	}
	
	// 결재문서(문서함)
	public List<ListDocDTO> getApprovalIsMe(Map<String, Object> map){
		return adao.selectApprovalIsMe(map);
	}
	
	// 반려문서(문서함)
	public List<ListDocDTO> getReturn(Map<String, Object> map){
		return adao.selectReturn(map);
	}
	
	// 취소문서(문서함)
	public List<ListDocDTO> getCancle(Map<String, Object> map){
		return adao.selectCancle(map);
	}
	
	// 결재 대기 문서(결재하기)
	public List<ListDocDTO> getApprovalWait(Map<String, Object> map){
		return adao.selectApprovalWait(map);
	}
	
	// 결재 예정 문서(결재하기)
	public List<ListDocDTO> getApprovalBook(Map<String, Object> map){
		return adao.selectApprovalBook(map);
	}
	
	// 참조/열람 문서(결재하기)
	public List<ListDocDTO> getReferIsMeWait(Map<String, Object> map){
		return adao.selectReferIsMeWait(map);
	}
	
	// 임시 저장 문서
	public List<ListDocDTO> getTemp(Map<String, Object> map){
		return adao.selectTemp(map);
	}
	
	// 게시물 총 개수
	public int getCount(Map<String, String> map) {
		return adao.selectCount(map);
	}
		
	
	// 디테일 페이지(공통정보 출력)
	public ApprovalDTO getApproval(int seq){
		return adao.selectApproval(seq);
	}
	
	// 상신취소
	public void cancleByMe(int seq) {
		adao.updateDocStateCancle(seq);
	}
	
	// 임시 저장글 삭제
	@Transactional(rollbackFor = IOException.class)
	public void deleteTemp(int seq, String setlist) {
		
		// 공통 내역 삭제
		adao.delete(seq);
		
		// 문서 내용 삭제
		if(setlist.equals("업무기안서")) {
			dddao.delete(seq);
//			System.out.println("업무기안서 삭제 완료");
			
		}else if(setlist.equals("휴직신청서")) {
			dldao.delete(seq);
//			System.out.println("휴직신청서 삭제 완료");
			
		}else if(setlist.equals("휴가신청서")) {
			dvdao.delete(seq);
//			System.out.println("휴가신청서 삭제 완료");
		}
		
		// 결재 라인 삭제
		aldao.delete(seq);
		// 참조 라인 삭제
		rldao.delete(seq);
		
	}
	
	@Transactional(rollbackFor = IOException.class)
	public void write(int type, ApprovalDTO adto, List<ApprovalLineDTO> alist, List<ReferLineDTO> rlist, DocDraftDTO ddto, DocVacationDTO dvdto, DocLeaveDTO dldto) {
    	
    	// 공통정보 입력
    	int temp_seq = adao.write(adto);
    	
    	// 문서별 내용 입력
    	if(type == 1) {
    		ddto.setDraft_seq(temp_seq);
    		dddao.insert(ddto);    		
    	}else if(type == 3){
    		dvdto.setVacation_seq(temp_seq);
//    		System.out.println("임시저장 테스트"+dvdto.getVacation_category() +":"+dvdto.getVacation_seq()+":"+dvdto.getVacation_start());
    		dvdao.insert(dvdto);
    	}else if(type == 2) {
    		dldto.setLeave_seq(temp_seq);
    		dldao.insert(dldto);
    	}
    	
    	// 결재라인 입력
		for(ApprovalLineDTO dto: alist) {
			dto.setTemp_seq(temp_seq);
			if(dto.getApproval_id() != null) {
				aldao.insert(dto);
			}
		}

		if(rlist.size() > 0) {
			// 참조라인 입력
			for(ReferLineDTO dto: rlist) {
				dto.setTemp_seq(temp_seq);
				rldao.insert(dto);
			}
		}
		else {
//			System.out.println("첨부파일 없음");
		}
	}
	
	public Map<String, Object> getVacationHistory(String memberId, int start, int end) {
        List<Map<String, Object>> history = adao.getVacationHistory(memberId, start, end);
        int totalRecordCount = adao.getTotalRecordCount(memberId);

        // 결과를 맵으로 묶어서 반환
        Map<String, Object> result = new HashMap<>();
        result.put("history", history);
        result.put("totalRecordCount", totalRecordCount);

        return result;
    }
	public Map<String, Object> getAllVacationHistory(String team, int start, int end) {
        List<Map<String, Object>> history = adao.getAllVacationHistory(team, start, end);
        int totalRecordCount = getRecordCount(team);

        Map<String, Object> result = new HashMap<>();
        result.put("history", history);
        result.put("totalRecordCount", totalRecordCount);

        return result;
    }
	
	 private int getRecordCount(String team) {
	        if (team == null || team.isEmpty()) {
	            return adao.getAllRecordCount();
	        } else {
	            return adao.getTeamRecordCount(team);
	        }
	    }
}
