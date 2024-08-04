package com.nbti.dto;

import java.sql.Timestamp;

public class DocVacationDTO {
	
	private int vacation_seq, vacation_category;
	private Timestamp vacation_start;
	private String start_half, start_half_ap;
	private Timestamp vacation_end;
	private String end_half, end_half_ap;
	
	public DocVacationDTO(int vacation_seq, int vacation_category, Timestamp vacation_start, String start_half,
			String start_half_ap, Timestamp vacation_end, String end_half, String end_half_ap) {
		super();
		this.vacation_seq = vacation_seq;
		this.vacation_category = vacation_category;
		this.vacation_start = vacation_start;
		this.start_half = start_half;
		this.start_half_ap = start_half_ap;
		this.vacation_end = vacation_end;
		this.end_half = end_half;
		this.end_half_ap = end_half_ap;
	}

	public DocVacationDTO() {
		super();
	}

	public int getVacation_seq() {
		return vacation_seq;
	}

	public void setVacation_seq(int vacation_seq) {
		this.vacation_seq = vacation_seq;
	}

	public int getVacation_category() {
		return vacation_category;
	}

	public void setVacation_category(int vacation_category) {
		this.vacation_category = vacation_category;
	}

	public Timestamp getVacation_start() {
		return vacation_start;
	}

	public void setVacation_start(Timestamp vacation_start) {
		this.vacation_start = vacation_start;
	}

	public String getStart_half() {
		return start_half;
	}

	public void setStart_half(String start_half) {
		this.start_half = start_half;
	}

	public String getStart_half_ap() {
		return start_half_ap;
	}

	public void setStart_half_ap(String start_half_ap) {
		this.start_half_ap = start_half_ap;
	}

	public Timestamp getVacation_end() {
		return vacation_end;
	}

	public void setVacation_end(Timestamp vacation_end) {
		this.vacation_end = vacation_end;
	}

	public String getEnd_half() {
		return end_half;
	}

	public void setEnd_half(String end_half) {
		this.end_half = end_half;
	}

	public String getEnd_half_ap() {
		return end_half_ap;
	}

	public void setEnd_half_ap(String end_half_ap) {
		this.end_half_ap = end_half_ap;
	}
	
	

}
