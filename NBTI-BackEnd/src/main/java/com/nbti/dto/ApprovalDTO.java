package com.nbti.dto;

import java.sql.Timestamp;

public class ApprovalDTO {
	
	private int temp_seq;
	private String member_id;
	private Timestamp approval_date;
	private int doc_sub_seq;
	private String emergency, cancle_yn, approval_seq, doc_state_code;
	
	
	public ApprovalDTO() {
		super();
	}


	public ApprovalDTO(int temp_seq, String member_id, Timestamp approval_date, int doc_sub_seq, String emergency,
			String cancle_yn, String approval_seq, String doc_state_code) {
		super();
		this.temp_seq = temp_seq;
		this.member_id = member_id;
		this.approval_date = approval_date;
		this.doc_sub_seq = doc_sub_seq;
		this.emergency = emergency;
		this.cancle_yn = cancle_yn;
		this.approval_seq = approval_seq;
		this.doc_state_code = doc_state_code;
	}


	public int getTemp_seq() {
		return temp_seq;
	}


	public void setTemp_seq(int temp_seq) {
		this.temp_seq = temp_seq;
	}


	public String getMember_id() {
		return member_id;
	}


	public void setMember_id(String member_id) {
		this.member_id = member_id;
	}


	public Timestamp getApproval_date() {
		return approval_date;
	}


	public void setApproval_date(Timestamp approval_date) {
		this.approval_date = approval_date;
	}


	public int getDoc_sub_seq() {
		return doc_sub_seq;
	}


	public void setDoc_sub_seq(int doc_sub_seq) {
		this.doc_sub_seq = doc_sub_seq;
	}


	public String getEmergency() {
		return emergency;
	}


	public void setEmergency(String emergency) {
		this.emergency = emergency;
	}


	public String getCancle_yn() {
		return cancle_yn;
	}


	public void setCancle_yn(String cancle_yn) {
		this.cancle_yn = cancle_yn;
	}


	public String getApproval_seq() {
		return approval_seq;
	}


	public void setApproval_seq(String approval_seq) {
		this.approval_seq = approval_seq;
	}


	public String getDoc_state_code() {
		return doc_state_code;
	}


	public void setDoc_state_code(String doc_state_code) {
		this.doc_state_code = doc_state_code;
	}
	
	
	

}
