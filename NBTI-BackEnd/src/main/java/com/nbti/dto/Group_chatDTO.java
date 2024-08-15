package com.nbti.dto;


public class Group_chatDTO {
	private int seq;
	private String invite;
	public int getSeq() {
		return seq;
	}
	public void setSeq(int seq) {
		this.seq = seq;
	}
	public String getInvite() {
		return invite;
	}
	public void setInvite(String invite) {
		this.invite = invite;
	}
	public Group_chatDTO(int seq, String invite) {
		super();
		this.seq = seq;
		this.invite = invite;
	}
	public Group_chatDTO() {
		super();
	}


}
