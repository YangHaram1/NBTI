package com.nbti.dto;

public class Group_memberDTO {
	private int group_seq;
	private String member_id;
	private int last_chat_seq;
	private String alarm="N";
	private String bookmark="N";
	private String name ;
	public int getGroup_seq() {
		return group_seq;
	}
	public void setGroup_seq(int group_seq) {
		this.group_seq = group_seq;
	}
	public String getMember_id() {
		return member_id;
	}
	public void setMember_id(String member_id) {
		this.member_id = member_id;
	}
	public int getLast_chat_seq() {
		return last_chat_seq;
	}
	public void setLast_chat_seq(int last_chat_seq) {
		this.last_chat_seq = last_chat_seq;
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
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Group_memberDTO(int group_seq, String member_id, int last_chat_seq, String alarm, String bookmark,
			String name) {
		super();
		this.group_seq = group_seq;
		this.member_id = member_id;
		this.last_chat_seq = last_chat_seq;
		this.alarm = alarm;
		this.bookmark = bookmark;
		this.name = name;
	}
	public Group_memberDTO() {
		super();
	}
	
	
	
	
	
	
}
