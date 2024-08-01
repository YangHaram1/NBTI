package com.nbti.dto;

import java.sql.Timestamp;

public class ApprovalLineDTO {
	
	private int approval_line_seq, temp_seq;
	private String approval_id, comments, member_state_code;
	private int approval_order;
	private Timestamp approval_date;
	
	public ApprovalLineDTO(int approval_line_seq, int temp_seq, String approval_id, String comments,
			String member_state_code, int approval_order, Timestamp approval_date) {
		super();
		this.approval_line_seq = approval_line_seq;
		this.temp_seq = temp_seq;
		this.approval_id = approval_id;
		this.comments = comments;
		this.member_state_code = member_state_code;
		this.approval_order = approval_order;
		this.approval_date = approval_date;
	}

	public ApprovalLineDTO() {
		super();
	}

	public int getApproval_line_seq() {
		return approval_line_seq;
	}

	public void setApproval_line_seq(int approval_line_seq) {
		this.approval_line_seq = approval_line_seq;
	}

	public int getTemp_seq() {
		return temp_seq;
	}

	public void setTemp_seq(int temp_seq) {
		this.temp_seq = temp_seq;
	}

	public String getApproval_id() {
		return approval_id;
	}

	public void setApproval_id(String approval_id) {
		this.approval_id = approval_id;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public String getMember_state_code() {
		return member_state_code;
	}

	public void setMember_state_code(String member_state_code) {
		this.member_state_code = member_state_code;
	}

	public int getApproval_order() {
		return approval_order;
	}

	public void setApproval_order(int approval_order) {
		this.approval_order = approval_order;
	}

	public Timestamp getApproval_date() {
		return approval_date;
	}

	public void setApproval_date(Timestamp approval_date) {
		this.approval_date = approval_date;
	}
	
	
	
	
	

}
