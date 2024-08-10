package com.nbti.dto;

import java.sql.Timestamp;

public class ReplyDTO {

	private int seq;
	private String member_id;
	private String contents;
	private Timestamp write_date = null;
	private int board_seq;
	private int board_code;
	private int count; // 좋아요 개수
	
	public ReplyDTO() {
	}

	public ReplyDTO(int seq, String member_id, String contents, Timestamp write_date, int board_seq, int board_code) {
		this.seq = seq;
		this.member_id = member_id;
		this.contents = contents;
		this.write_date = write_date;
		this.board_seq = board_seq;
		this.board_code = board_code;
		this.count = 0;
	}

	public ReplyDTO(int seq, String member_id, String contents, Timestamp write_date, int board_seq, int board_code,
			int count) {
		super();
		this.seq = seq;
		this.member_id = member_id;
		this.contents = contents;
		this.write_date = write_date;
		this.board_seq = board_seq;
		this.board_code = board_code;
		this.count = count;
	}


	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public int getSeq() {
		return seq;
	}
	public void setSeq(int seq) {
		this.seq = seq;
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
	public Timestamp getWrite_date() {
		return write_date;
	}
	public void setWrite_date(Timestamp write_date) {
		this.write_date = write_date;
	}
	public int getBoard_seq() {
		return board_seq;
	}
	public void setBoard_seq(int board_seq) {
		this.board_seq = board_seq;
	}
	public int getBoard_code() {
		return board_code;
	}
	public void setBoard_code(int board_code) {
		this.board_code = board_code;
	}
	
	


}



