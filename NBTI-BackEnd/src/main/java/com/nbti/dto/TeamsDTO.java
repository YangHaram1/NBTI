package com.nbti.dto;

public class TeamsDTO {
	
	private String team_code;
	private String team_name;
	private String dept_code;
	public TeamsDTO() {}
	public TeamsDTO(String team_code, String team_name, String dept_code) {
		super();
		this.team_code = team_code;
		this.team_name = team_name;
		this.dept_code = dept_code;
	}
	public String getTeam_code() {
		return team_code;
	}
	public void setTeam_code(String team_code) {
		this.team_code = team_code;
	}
	public String getTeam_name() {
		return team_name;
	}
	public void setTeam_name(String team_name) {
		this.team_name = team_name;
	}
	public String getDept_code() {
		return dept_code;
	}
	public void setDept_code(String dept_code) {
		this.dept_code = dept_code;
	}
}
