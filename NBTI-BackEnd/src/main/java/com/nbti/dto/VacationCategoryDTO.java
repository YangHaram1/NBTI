package com.nbti.dto;

public class VacationCategoryDTO {
	
	private int vacation_seq;
	private String vacation_name;
	
	public VacationCategoryDTO(int vacation_seq, String vacation_name) {
		super();
		this.vacation_seq = vacation_seq;
		this.vacation_name = vacation_name;
	}

	public VacationCategoryDTO() {
		super();
	}

	public int getVacation_seq() {
		return vacation_seq;
	}

	public void setVacation_seq(int vacation_seq) {
		this.vacation_seq = vacation_seq;
	}

	public String getVacation_name() {
		return vacation_name;
	}

	public void setVacation_name(String vacation_name) {
		this.vacation_name = vacation_name;
	}
	
	
	

}
