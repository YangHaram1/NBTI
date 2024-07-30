package com.nbti.dto;

public class Group_chatSizeDTO {
	private int seq;
	private String name;
	private String alarm;
	private String bookmark;
	private int size;
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
	public int getSize() {
		return size;
	}
	public void setSize(int size) {
		this.size = size;
	}
	public Group_chatSizeDTO(int seq, String name, String alarm, String bookmark, int size) {
		super();
		this.seq = seq;
		this.name = name;
		this.alarm = alarm;
		this.bookmark = bookmark;
		this.size = size;
	}
	public Group_chatSizeDTO() {
		super();
	}
	
	
}
