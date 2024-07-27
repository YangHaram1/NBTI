package com.nbti.dto;


public class Group_chatDTO {
	private int seq;
	private String name;
	private String alarm;
	private String bookmark;
	public int getSeq() {
		return seq;
	}
	public void setSeq(int seq) {
		this.seq = seq;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAlarm() {
		return alarm;
	}
	public void setAlarm(String alarm) {
		this.alarm = alarm;
	}
	public String getBookmark() {
		return bookmark;
	}
	public void setBookmark(String bookmark) {
		this.bookmark = bookmark;
	}
	public Group_chatDTO() {
		super();
	}
	public Group_chatDTO(int seq, String name, String alarm, String bookmark) {
		super();
		this.seq = seq;
		this.name = name;
		this.alarm = alarm;
		this.bookmark = bookmark;
	}

	
}
