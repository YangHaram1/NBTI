package com.nbti.dto;

import java.sql.Timestamp;

public class ReportBoardDTO {
	
	private int seq;
	private int board_seq;
	private String member_id;
	private String contents;
	private Timestamp report_date;
	
	public ReportBoardDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public ReportBoardDTO(int seq, int board_seq, String member_id, String contents, Timestamp report_date) {
		super();
		this.seq = seq;
		this.board_seq = board_seq;
		this.member_id = member_id;
		this.contents = contents;
		this.report_date = report_date;
	}
	
	
	public int getSeq() {
		return seq;
	}
	public void setSeq(int seq) {
		this.seq = seq;
	}
	public int getBoard_seq() {
		return board_seq;
	}
	public void setBoard_seq(int board_seq) {
		this.board_seq = board_seq;
	}
	public String getMember_id() {
		return member_id;
	}
	public void setMember_id(String member_id) {
		this.member_id = member_id;
	}
	public String getContents() {
		return contents;
	}
	public void setContents(String contents) {
		this.contents = contents;
	}
	public Timestamp getReport_date() {
		return report_date;
	}
	public void setReport_date(Timestamp report_date) {
		this.report_date = report_date;
	}


}
