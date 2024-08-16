package com.nbti.dto;

import java.sql.Timestamp;

public class CalendarDTO {
	private int seq;
	private String member_id;
	private String calendar_name;
	private String title;
	private String contents;
	private Timestamp start_date;
	private Timestamp end_date;
	
	public CalendarDTO() {
		super();
	}
	public CalendarDTO(int seq, String member_id, String calendar_name, String title, String contents,
			Timestamp start_date, Timestamp end_date) {
		super();
		this.seq = seq;
		this.member_id = member_id;
		this.calendar_name = calendar_name;
		this.title = title;
		this.contents = contents;
		this.start_date = start_date;
		this.end_date = end_date;
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
	public String getCalendar_name() {
		return calendar_name;
	}
	public void setCalendar_title_code(String calendar_name) {
		this.calendar_name = calendar_name;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContents() {
		return contents;
	}
	public void setContents(String contents) {
		this.contents = contents;
	}
	public Timestamp getStart_date() {
		return start_date;
	}
	public void setStart_date(Timestamp start_date) {
		this.start_date = start_date;
	}
	public Timestamp getEnd_date() {
		return end_date;
	}
	public void setEnd_date(Timestamp end_date) {
		this.end_date = end_date;
	}

	
	
}
