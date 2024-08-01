package com.nbti.dto;

import java.sql.Timestamp;

public class DocDraftDTO {
	
	private int draft_seq;
	private Timestamp effective_date;
	private String cooperation_dept, title, content;
	
	public DocDraftDTO(int draft_seq, Timestamp effective_date, String cooperation_dept, String title, String content) {
		super();
		this.draft_seq = draft_seq;
		this.effective_date = effective_date;
		this.cooperation_dept = cooperation_dept;
		this.title = title;
		this.content = content;
	}

	public DocDraftDTO() {
		super();
	}

	public int getDraft_seq() {
		return draft_seq;
	}

	public void setDraft_seq(int draft_seq) {
		this.draft_seq = draft_seq;
	}

	public Timestamp getEffective_date() {
		return effective_date;
	}

	public void setEffective_date(Timestamp effective_date) {
		this.effective_date = effective_date;
	}

	public String getCooperation_dept() {
		return cooperation_dept;
	}

	public void setCooperation_dept(String cooperation_dept) {
		this.cooperation_dept = cooperation_dept;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
	
	
	
	
}
