package com.nbti.dto;

public class CalendarListDTO {
	private int calendar_id;
	private String member_id;
	private String calendar_name;
	private String calendar_type;
	
	public CalendarListDTO(){
		super();
	}
	
	public CalendarListDTO(int calendar_id, String member_id, String calendar_name, String calendar_type) {
		super();
		this.calendar_id = calendar_id;
		this.member_id = member_id;
		this.calendar_name = calendar_name;
		this.calendar_type = calendar_type;
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
	
	public String getCalendar_name() {
		return calendar_name;
	}
	
	public void setCalendar_name(String calendar_name) {
		this.calendar_name = calendar_name;
	}
	
	public String getCalendar_type() {
		return calendar_type;
	}
	
	public void setCalendar_type(String calendar_type) {
		this.calendar_type = calendar_type;
	}
}
