package com.nbti.dto;

public class JobDTO {
	private String job_code;
	private String job_name;
	public JobDTO() {}
	public JobDTO(String job_code, String job_name) {
		super();
		this.job_code = job_code;
		this.job_name = job_name;
	}
	public String getJob_code() {
		return job_code;
	}
	public void setJob_code(String job_code) {
		this.job_code = job_code;
	}
	public String getJob_name() {
		return job_name;
	}
	public void setJob_name(String job_name) {
		this.job_name = job_name;
	}
}
