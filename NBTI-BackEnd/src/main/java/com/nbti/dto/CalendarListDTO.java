package com.nbti.dto;

public class CalendarListDTO {
/*
 * -- 캘린더 목록 
CREATE table calendarList (
    seq number primary key,
    name VARCHAR(1024) not null,
    type VARCHAR(32) not null -- private: 개인, public: 공유
);
INSERT into calendarList values(calendarList_seq.nextval, '공유 프로젝트', 'public');

*/
	
	private int seq;
	private String name;
	private String type;
	
	public CalendarListDTO() {
		super();
	}
	public CalendarListDTO(int seq, String name, String type) {
		super();
		this.seq = seq;
		this.name = name;
		this.type = type;
	}
	public int getSeq() {
		return seq;
	}
	public void setSeq(int seq) {
		this.seq = seq;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	
	
	
	
}
