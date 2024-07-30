package com.nbti.dto;

import java.sql.Timestamp;

public class User_historyDTO {
	private int seq;
	private String member_id;
	private String ip;
	private Timestamp join_date;
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
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	public Timestamp getJoin_date() {
		return join_date;
	}
	public void setJoin_date(Timestamp join_date) {
		this.join_date = join_date;
	}
	public User_historyDTO(int seq, String member_id, String ip, Timestamp join_date) {
		super();
		this.seq = seq;
		this.member_id = member_id;
		this.ip = ip;
		this.join_date = join_date;
	}
	public User_historyDTO() {
		super();
	}
	
	
}
