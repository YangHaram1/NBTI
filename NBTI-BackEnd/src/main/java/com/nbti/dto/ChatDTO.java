package com.nbti.dto;

import java.sql.Timestamp;

public class ChatDTO {
	private int seq;
	private String member_id;
	private String message;
	private Timestamp write_date;
	private int group_seq;
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
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public Timestamp getWrite_date() {
		return write_date;
	}
	public void setWrite_date(Timestamp write_date) {
		this.write_date = write_date;
	}
	public int getGroup_seq() {
		return group_seq;
	}
	public void setGroup_seq(int group_seq) {
		this.group_seq = group_seq;
	}
	public ChatDTO(int seq, String member_id, String message, Timestamp write_date, int group_seq) {
		super();
		this.seq = seq;
		this.member_id = member_id;
		this.message = message;
		this.write_date = write_date;
		this.group_seq = group_seq;
	}
	public ChatDTO() {
		super();
	}

}
