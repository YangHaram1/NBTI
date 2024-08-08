package com.nbti.dto;

import java.sql.Timestamp;

public class MembersDTO {
	
	private String id, pw, name, email;
	private Timestamp enter_date;
	private String team_code, job_code, member_level, member_call, address, birth, gender, end_date, ent_yn;
	private int vacation_period;
	private String member_img;
	private Timestamp pw_change_date;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPw() {
		return pw;
	}
	public void setPw(String pw) {
		this.pw = pw;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Timestamp getEnter_date() {
		return enter_date;
	}
	public void setEnter_date(Timestamp enter_date) {
		this.enter_date = enter_date;
	}
	public String getTeam_code() {
		return team_code;
	}
	public void setTeam_code(String team_code) {
		this.team_code = team_code;
	}
	public String getJob_code() {
		return job_code;
	}
	public void setJob_code(String job_code) {
		this.job_code = job_code;
	}
	public String getMember_level() {
		return member_level;
	}
	public void setMember_level(String member_level) {
		this.member_level = member_level;
	}
	public String getMember_call() {
		return member_call;
	}
	public void setMember_call(String member_call) {
		this.member_call = member_call;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getBirth() {
		return birth;
	}
	public void setBirth(String birth) {
		this.birth = birth;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getEnd_date() {
		return end_date;
	}
	public void setEnd_date(String end_date) {
		this.end_date = end_date;
	}
	public String getEnt_yn() {
		return ent_yn;
	}
	public void setEnt_yn(String ent_yn) {
		this.ent_yn = ent_yn;
	}
	public int getVacation_period() {
		return vacation_period;
	}
	public void setVacation_period(int vacation_period) {
		this.vacation_period = vacation_period;
	}
	public String getMember_img() {
		return member_img;
	}
	public void setMember_img(String member_img) {
		this.member_img = member_img;
	}
	public Timestamp getPw_change_date() {
		return pw_change_date;
	}
	public void setPw_change_date(Timestamp pw_change_date) {
		this.pw_change_date = pw_change_date;
	}
	public MembersDTO(String id, String pw, String name, String email, Timestamp enter_date, String team_code,
			String job_code, String member_level, String member_call, String address, String birth, String gender,
			String end_date, String ent_yn, int vacation_period, String member_img, Timestamp pw_change_date) {
		super();
		this.id = id;
		this.pw = pw;
		this.name = name;
		this.email = email;
		this.enter_date = enter_date;
		this.team_code = team_code;
		this.job_code = job_code;
		this.member_level = member_level;
		this.member_call = member_call;
		this.address = address;
		this.birth = birth;
		this.gender = gender;
		this.end_date = end_date;
		this.ent_yn = ent_yn;
		this.vacation_period = vacation_period;
		this.member_img = member_img;
		this.pw_change_date = pw_change_date;
	}
	public MembersDTO() {
		super();
	}
	
	
	
	
	
	

}
