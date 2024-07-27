package com.nbti.dto;

import java.sql.Timestamp;

public class ReservationDTO {
	private int seq;
	private String member_id;
	private String reserve_code;
	private String purpose;
	private Timestamp start_time;
	public ReservationDTO() {
		super();
	}
	public ReservationDTO(int seq, String member_id, String reserve_code, String purpose, Timestamp start_time,
			Timestamp end_time) {
		super();
		this.seq = seq;
		this.member_id = member_id;
		this.reserve_code = reserve_code;
		this.purpose = purpose;
		this.start_time = start_time;
		this.end_time = end_time;
	}
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
	public String getReserve_code() {
		return reserve_code;
	}
	public void setReserve_code(String reserve_code) {
		this.reserve_code = reserve_code;
	}
	public String getPurpose() {
		return purpose;
	}
	public void setPurpose(String purpose) {
		this.purpose = purpose;
	}
	public Timestamp getStart_time() {
		return start_time;
	}
	public void setStart_time(Timestamp start_time) {
		this.start_time = start_time;
	}
	public Timestamp getEnd_time() {
		return end_time;
	}
	public void setEnd_time(Timestamp end_time) {
		this.end_time = end_time;
	}
	private Timestamp end_time;
}
