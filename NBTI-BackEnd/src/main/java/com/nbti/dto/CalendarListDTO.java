package com.nbti.dto;


public class CalendarListDTO {
	private String member_id;
	private String member_list;
	private String calendar_name;
	private String calendar_type;
	public CalendarListDTO(){
		super();
	}
	public CalendarListDTO(String member_id, String member_list, String calendar_name, String calendar_type) {
		super();
		this.member_id = member_id;
		this.member_list = member_list;
		this.calendar_name = calendar_name;
		this.calendar_type = calendar_type;
	}
	public String getMember_id() {
		return member_id;
	}
	public void setMember_id(String member_id) {
		this.member_id = member_id;
	}
	public String getMember_list() {
		return member_list;
	}
	public void setMember_list(String member_list) {
		this.member_list = member_list;
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
