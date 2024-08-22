package com.nbti.dto;

import java.util.List;

public class Group_chatSizeDTO {
	private int seq;
	private String name;
	private String alarm;
	private String bookmark;
	private int size;
	private int unread;
	private List<MembersDTO> list;
	private ChatDTO dto;
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
	public String getAlarm() {
		return alarm;
	}
	public void setAlarm(String alarm) {
		this.alarm = alarm;
	}
	public String getBookmark() {
		return bookmark;
	}
	public void setBookmark(String bookmark) {
		this.bookmark = bookmark;
	}
	public int getSize() {
		return size;
	}
	public void setSize(int size) {
		this.size = size;
	}
	public int getUnread() {
		return unread;
	}
	public void setUnread(int unread) {
		this.unread = unread;
	}
	public List<MembersDTO> getList() {
		return list;
	}
	public void setList(List<MembersDTO> list) {
		this.list = list;
	}
	public ChatDTO getDto() {
		return dto;
	}
	public void setDto(ChatDTO dto) {
		this.dto = dto;
	}
	public Group_chatSizeDTO(int seq, String name, String alarm, String bookmark, int size, int unread,
			List<MembersDTO> list, ChatDTO dto) {
		super();
		this.seq = seq;
		this.name = name;
		this.alarm = alarm;
		this.bookmark = bookmark;
		this.size = size;
		this.unread = unread;
		this.list = list;
		this.dto = dto;
	}
	public Group_chatSizeDTO() {
		super();
	}
	
	
	
	
	
	
	
}
