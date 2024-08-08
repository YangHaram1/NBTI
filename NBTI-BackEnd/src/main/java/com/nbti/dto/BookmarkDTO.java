package com.nbti.dto;

public class BookmarkDTO {
	
	private int seq;
	private int board_seq;
	private String member_id;
	
	public BookmarkDTO() {
	}

	public BookmarkDTO(int seq, int board_seq, String member_id) {
		this.seq = seq;
		this.board_seq = board_seq;
		this.member_id = member_id;
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
	
	

}
