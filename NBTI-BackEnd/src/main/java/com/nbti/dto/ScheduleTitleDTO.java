package com.nbti.dto;

import java.sql.Timestamp;

public class ScheduleTitleDTO {
	
	
	private int seq;
	private String member_id;
	private String scheduleTitle_name;
	private String calendarTitle;
	private String contents;
	private Timestamp start_date;
	private Timestamp end_date;
	
	
	public ScheduleTitleDTO () {
		super();
	}
	public ScheduleTitleDTO(int seq, String member_id, String scheduleTitle_name, String calendarTitle, String contents,
			Timestamp start_date, Timestamp end_date) {
		super();
		this.seq = seq;
		this.member_id = member_id;
		this.scheduleTitle_name = scheduleTitle_name;
		this.calendarTitle = calendarTitle;
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
	public String getScheduleTitle_name() {
		return scheduleTitle_name;
	}
	public void setScheduleTitle_name(String scheduleTitle_name) {
		this.scheduleTitle_name = scheduleTitle_name;
	}
	public String getCalendarTitle() {
		return calendarTitle;
	}
	public void setCalendarTitle(String calendarTitle) {
		this.calendarTitle = calendarTitle;
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
