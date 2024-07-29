package com.nbti.dto;

public class Group_memberDTO {
	private int group_seq;
	private String member_id;
	private String chat_check;
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
	public String getChat_check() {
		return chat_check;
	}
	public void setChat_check(String chat_check) {
		this.chat_check = chat_check;
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
	public Group_memberDTO(int group_seq, String member_id, String chat_check, String file_path, String chat_path) {
		super();
		this.group_seq = group_seq;
		this.member_id = member_id;
		this.chat_check = chat_check;
		this.file_path = file_path;
		this.chat_path = chat_path;
	}
	public Group_memberDTO() {
		super();
	}
	
	
}
