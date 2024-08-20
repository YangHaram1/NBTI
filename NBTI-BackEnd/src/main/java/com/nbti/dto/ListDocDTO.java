package com.nbti.dto;

import java.sql.Timestamp;

public class ListDocDTO {
	
	private int temp_seq; // 임시번호
	private Timestamp approval_date; // 기안일 
	private String doc_sub_name, emergency, title, file_yn, member_id, approval_seq, doc_state, name; 
	private int rown;
	                // 결재양식 이름, 긴급유무, 제목, 첨부파일유무, 작성자, 문서번호, 문서 상태 
	
	public ListDocDTO(int temp_seq, Timestamp approval_date, String doc_sub_name, String emergency, String title,
			String file_yn, String member_id, String approval_seq, String doc_state, String name, int rown) {
		super();
		this.temp_seq = temp_seq;
		this.approval_date = approval_date;
		this.doc_sub_name = doc_sub_name;
		this.emergency = emergency;
		this.title = title;
		this.file_yn = file_yn;
		this.member_id = member_id;
		this.approval_seq = approval_seq;
		this.doc_state = doc_state;
		this.name = name;
		this.rown = rown;
	}

	public ListDocDTO(int temp_seq, Timestamp approval_date, String doc_sub_name, String emergency, String title,
			String file_yn, String member_id, String approval_seq, String doc_state) {
		super();
		this.temp_seq = temp_seq;
		this.approval_date = approval_date;
		this.doc_sub_name = doc_sub_name;
		this.emergency = emergency;
		this.title = title;
		this.file_yn = file_yn;
		this.member_id = member_id;
		this.approval_seq = approval_seq;
		this.doc_state = doc_state;
	}
	
	// 결재대기, 결재예정, 참조/열람 대기
	public ListDocDTO(int temp_seq, Timestamp approval_date, String doc_sub_name, String emergency, String title,
			String file_yn, String member_id) {
		super();
		this.temp_seq = temp_seq;
		this.approval_date = approval_date;
		this.doc_sub_name = doc_sub_name;
		this.emergency = emergency;
		this.title = title;
		this.file_yn = file_yn;
		this.member_id = member_id;
	}
	
	
	public ListDocDTO(int temp_seq, Timestamp approval_date, String doc_sub_name, String emergency, String title,
			String member_id, String approval_seq, String doc_state) {
		super();
		this.temp_seq = temp_seq;
		this.approval_date = approval_date;
		this.doc_sub_name = doc_sub_name;
		this.emergency = emergency;
		this.title = title;
		this.member_id = member_id;
		this.approval_seq = approval_seq;
		this.doc_state = doc_state;
	}
	
	public ListDocDTO(int temp_seq, Timestamp approval_date, String doc_sub_name, String emergency, String title,
			String file_yn, String member_id, String approval_seq, String doc_state, String name) {
		super();
		this.temp_seq = temp_seq;
		this.approval_date = approval_date;
		this.doc_sub_name = doc_sub_name;
		this.emergency = emergency;
		this.title = title;
		this.file_yn = file_yn;
		this.member_id = member_id;
		this.approval_seq = approval_seq;
		this.doc_state = doc_state;
		this.name = name;
	}

	public ListDocDTO() {
		super();
	}
	public int getTemp_seq() {
		return temp_seq;
	}
	public void setTemp_seq(int temp_seq) {
		this.temp_seq = temp_seq;
	}
	public Timestamp getApproval_date() {
		return approval_date;
	}
	public void setApproval_date(Timestamp approval_date) {
		this.approval_date = approval_date;
	}
	public String getDoc_sub_name() {
		return doc_sub_name;
	}
	public void setForm_sub_name(String doc_sub_name) {
		this.doc_sub_name = doc_sub_name;
	}
	public String getEmergency() {
		return emergency;
	}
	public void setEmergency(String emergency) {
		this.emergency = emergency;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getFile_yn() {
		return file_yn;
	}
	public void setFile_yn(String file_yn) {
		this.file_yn = file_yn;
	}
	public String getMember_id() {
		return member_id;
	}
	public void setMember_id(String member_id) {
		this.member_id = member_id;
	}
	public String getApproval_seq() {
		return approval_seq;
	}
	public void setApproval_seq(String approval_seq) {
		this.approval_seq = approval_seq;
	}
	public String getDoc_state() {
		return doc_state;
	}
	public void setDoc_state(String doc_state) {
		this.doc_state = doc_state;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setDoc_sub_name(String doc_sub_name) {
		this.doc_sub_name = doc_sub_name;
	}

	public int getRown() {
		return rown;
	}

	public void setRown(int rown) {
		this.rown = rown;
	}
	
	
	

}
