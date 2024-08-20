package com.nbti.dto;

public class GroupDTO {
	private String name;
	private String job_name;
	private String member_img;
	private String id,gender,member_call,email;
	
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
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getMember_call() {
		return member_call;
	}
	public void setMember_call(String member_call) {
		this.member_call = member_call;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public GroupDTO(String name, String job_name, String member_img, String id, String gender, String member_call,
			String email) {
		super();
		this.name = name;
		this.job_name = job_name;
		this.member_img = member_img;
		this.id = id;
		this.gender = gender;
		this.member_call = member_call;
		this.email = email;
	}
	public GroupDTO() {
		super();
	}
	
}
