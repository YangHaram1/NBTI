package com.nbti.services;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.nbti.commons.RealpathConfig;
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
import com.nbti.dto.FilesDTO;
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
	public List<ListDocDTO> getWriterIsMe(String id) {
		return adao.selectWriterIsMe(id);
	}
	
	// 참조문서(문서함)
	public List<ListDocDTO> getReferIsMe(String id){
		return adao.selectReferIsMe(id);
	}
	
	// 결재문서(문서함)
	public List<ListDocDTO> getApprovalIsMe(String id){
		return adao.selectApprovalIsMe(id);
	}
	
	// 반려문서(문서함)
	public List<ListDocDTO> getReturn(String id){
		return adao.selectReturn(id);
	}
	
	// 취소문서(문서함)
	public List<ListDocDTO> getCancle(String id){
		return adao.selectCancle(id);
	}
	
	// 결재 대기 문서(결재하기)
	public List<ListDocDTO> getApprovalWait(String id){
		return adao.selectApprovalWait(id);
	}
	
	// 결재 예정 문서(결재하기)
	public List<ListDocDTO> getApprovalBook(String id){
		return adao.selectApprovalBook(id);
	}
	
	// 참조/열람 문서(결재하기)
	public List<ListDocDTO> getReferIsMeWait(String id){
		return adao.selectReferIsMeWait(id);
	}
	
	// 임시 저장 문서
	public List<ListDocDTO> getTemp(String id){
		return adao.selectTemp(id);
	}
		
	
	// 디테일 페이지(공통정보 출력)
	public ApprovalDTO getApproval(int seq){
		return adao.selectApproval(seq);
	}
	
	// 상신취소
	public void cancleByMe(int seq) {
		adao.updateDocStateCancle(seq);
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
    		System.out.println("임시저장 테스트"+dvdto.getVacation_category() +":"+dvdto.getVacation_seq()+":"+dvdto.getVacation_start());
    		dvdao.insert(dvdto);
    	}else if(type == 2) {
    		dldto.setLeave_seq(temp_seq);
    		dldao.insert(dldto);
    	}
    	
    	// 결재라인 입력
		for(ApprovalLineDTO dto: alist) {
			dto.setTemp_seq(temp_seq);
			aldao.insert(dto);
		}

		if(rlist.size() > 0) {
			// 참조라인 입력
			for(ReferLineDTO dto: rlist) {
				dto.setTemp_seq(temp_seq);
				rldao.insert(dto);
			}
		}
		else {
			System.out.println("첨부파일 없음");
		}
	}

}
