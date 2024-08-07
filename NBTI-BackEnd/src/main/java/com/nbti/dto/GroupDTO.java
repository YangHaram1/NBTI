package com.nbti.dto;

public class GroupDTO {
	private String name;
	private String job_name;
	private String member_img;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getJob_name() {
		return job_name;
	}
	public void setJob_name(String job_name) {
		this.job_name = job_name;
	}
	public String getMember_img() {
		return member_img;
	}
	public void setMember_img(String member_img) {
		this.member_img = member_img;
	}
	public GroupDTO(String name, String job_name, String member_img) {
		super();
		this.name = name;
		this.job_name = job_name;
		this.member_img = member_img;
	}
	public GroupDTO() {
		super();
	}
	
	

}
