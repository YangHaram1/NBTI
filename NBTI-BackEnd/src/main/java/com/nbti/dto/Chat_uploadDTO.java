package com.nbti.dto;

public class Chat_uploadDTO {
	private int seq;
	private String oriname;
	private String sysname;
	private int group_seq;
	private String member_id;
	private int code;
	
	public int getSeq() {
		return seq;
	}
	public void setSeq(int seq) {
		this.seq = seq;
	}
	public String getOriname() {
		return oriname;
	}
	public void setOriname(String oriname) {
		this.oriname = oriname;
	}
	public String getSysname() {
		return sysname;
	}
	public void setSysname(String sysname) {
		this.sysname = sysname;
	}
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
	public int getCode() {
		return code;
	}
	public void setCode(int code) {
		this.code = code;
	}
	public Chat_uploadDTO(int seq, String oriname, String sysname, int group_seq, String member_id, int code) {
		super();
		this.seq = seq;
		this.oriname = oriname;
		this.sysname = sysname;
		this.group_seq = group_seq;
		this.member_id = member_id;
		this.code = code;
	}
	public Chat_uploadDTO() {
		super();
	}
	
	
}
