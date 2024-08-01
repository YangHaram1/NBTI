package com.nbti.dto;

import java.sql.Timestamp;

public class AttendanceDTO {
	private int seq;
	private String member_id;
	private Timestamp today;
	private Timestamp start_date;
	private Timestamp end_date;
	public AttendanceDTO(int seq, String member_id, Timestamp today, Timestamp start_date, Timestamp end_date) {
		super();
		this.seq = seq;
		this.member_id = member_id;
		this.today = today;
		this.start_date = start_date;
		this.end_date = end_date;
	}
	public AttendanceDTO() {
		super();
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
	public Timestamp getToday() {
		return today;
	}
	public void setToday(Timestamp today) {
		this.today = today;
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
