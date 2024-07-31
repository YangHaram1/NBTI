package com.nbti.dto;

public class Group_memberDTO {
	private int group_seq;
	private String member_id;
	private int last_chat_seq;
	private String file_path;
	private String chat_path;
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
	public String getFile_path() {
		return file_path;
	}
	public void setFile_path(String file_path) {
		this.file_path = file_path;
	}
	public String getChat_path() {
		return chat_path;
	}
	public void setChat_path(String chat_path) {
		this.chat_path = chat_path;
	}
	public Group_memberDTO(int group_seq, String member_id, int last_chat_seq, String file_path, String chat_path) {
		super();
		this.group_seq = group_seq;
		this.member_id = member_id;
		this.last_chat_seq = last_chat_seq;
		this.file_path = file_path;
		this.chat_path = chat_path;
	}
	public Group_memberDTO() {
		super();
	}
	
	
	
}
