package com.nbti.dto;

public class LikesDTO {

	private int seq;
	private int reply_seq;
	private String member_id;
	
	public LikesDTO() {
	}

	public LikesDTO(int seq, int reply_seq, String member_id) {
		this.seq = seq;
		this.reply_seq = reply_seq;
		this.member_id = member_id;
	}
	public int getSeq() {
		return seq;
	}
	public void setSeq(int seq) {
		this.seq = seq;
	}
	public int getReply_seq() {
		return reply_seq;
	}
	public void setReply_seq(int reply_seq) {
		this.reply_seq = reply_seq;
	}
	public String getMember_id() {
		return member_id;
	}
	public void setMember_id(String member_id) {
		this.member_id = member_id;
	}
	
	
}
