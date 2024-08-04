package com.nbti.dto;

import java.sql.Timestamp;

public class DocLeaveDTO {
	
	private int leave_seq;
	private String leave_reason;
	private Timestamp leave_start, leave_end;
	private String address, phone;
	
	public DocLeaveDTO(int leave_seq, String leave_reason, Timestamp leave_start, Timestamp leave_end, String address,
			String phone) {
		super();
		this.leave_seq = leave_seq;
		this.leave_reason = leave_reason;
		this.leave_start = leave_start;
		this.leave_end = leave_end;
		this.address = address;
		this.phone = phone;
	}

	public DocLeaveDTO() {
		super();
	}

	public int getLeave_seq() {
		return leave_seq;
	}

	public void setLeave_seq(int leave_seq) {
		this.leave_seq = leave_seq;
	}

	public String getLeave_reason() {
		return leave_reason;
	}

	public void setLeave_reason(String leave_reason) {
		this.leave_reason = leave_reason;
	}

	public Timestamp getLeave_start() {
		return leave_start;
	}

	public void setLeave_start(Timestamp leave_start) {
		this.leave_start = leave_start;
	}

	public Timestamp getLeave_end() {
		return leave_end;
	}

	public void setLeave_end(Timestamp leave_end) {
		this.leave_end = leave_end;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}
	
	

}
