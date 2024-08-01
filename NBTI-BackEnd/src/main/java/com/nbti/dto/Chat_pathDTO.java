package com.nbti.dto;

public class Chat_pathDTO {
	private String member_id;
	private String file_path;
	private String chat_path;
	public String getMember_id() {
		return member_id;
	}
	public void setMember_id(String member_id) {
		this.member_id = member_id;
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
	public Chat_pathDTO(String member_id, String file_path, String chat_path) {
		super();
		this.member_id = member_id;
		this.file_path = file_path;
		this.chat_path = chat_path;
	}
	public Chat_pathDTO() {
		super();
	}
	
	
}
