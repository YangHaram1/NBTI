package com.nbti.dto;

public class FilesDTO {
	
	private int seq;
	private String oriname, sysname;
	private int parent_seq, code;
	
	public FilesDTO(int seq, String oriname, String sysname, int parent_seq, int code) {
		super();
		this.seq = seq;
		this.oriname = oriname;
		this.sysname = sysname;
		this.parent_seq = parent_seq;
		this.code = code;
	}
	
	public FilesDTO() {
		super();
	}

	public int getSeq() {
		return seq;
	}

	public void setSeq(int seq) {
		this.seq = seq;
	}

	public String getOriname() {
		return oriname;
	}

	public void setOriname(String oriname) {
		this.oriname = oriname;
	}

	public String getSysname() {
		return sysname;
	}

	public void setSysname(String sysname) {
		this.sysname = sysname;
	}

	public int getParent_seq() {
		return parent_seq;
	}

	public void setParent_seq(int parent_seq) {
		this.parent_seq = parent_seq;
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}
	
	

}
