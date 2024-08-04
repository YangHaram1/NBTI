package com.nbti.dto;

public class CalendarSharedDTO {
	private int seq;
	private String member_id;
	private int calendar_seq;
	
	public CalendarSharedDTO() {
		super();
	}
	public CalendarSharedDTO(int seq, String member_id, int calendar_seq) {
		super();
		this.seq = seq;
		this.member_id = member_id;
		this.calendar_seq = calendar_seq;
	}
	public int getSeq() {
		return seq;
	}
	public void setSeq(int seq) {
		this.seq = seq;
	}
	public String getMember_id() {
		return member_id;
	}
	public void setMember_id(String member_id) {
		this.member_id = member_id;
	}
	public int getCalendar_seq() {
		return calendar_seq;
	}
	public void setCalendar_seq(int calendar_seq) {
		this.calendar_seq = calendar_seq;
	}
	
	
	
}
