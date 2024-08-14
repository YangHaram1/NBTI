package com.nbti.dto;

public class CalendarMembersDTO {

	private int calendar_members_seq;
	private int calendar_id;
	private String member_id;
	
	public CalendarMembersDTO() {
		super();
	}
	public CalendarMembersDTO(int calendar_members_seq, int calendar_id, String member_id) {
		super();
		this.calendar_members_seq = calendar_members_seq;
		this.calendar_id = calendar_id;
		this.member_id = member_id;
	}
	public int getCalendar_members_seq() {
		return calendar_members_seq;
	}
	public void setCalendar_members_seq(int calendar_members_seq) {
		this.calendar_members_seq = calendar_members_seq;
	}
	public int getCalendar_id() {
		return calendar_id;
	}
	public void setCalendar_id(int calendar_id) {
		this.calendar_id = calendar_id;
	}
	public String getMember_id() {
		return member_id;
	}
	public void setMember_id(String member_id) {
		this.member_id = member_id;
	}
	
	
	
}
