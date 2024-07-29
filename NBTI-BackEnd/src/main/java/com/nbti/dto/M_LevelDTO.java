package com.nbti.dto;

public class M_LevelDTO {
	private int seq;
	private String total;
	private	String hr;
	private String payment;
	private String reservation;
	private String message;
	private String task;
	public M_LevelDTO() {
		super();
	}
	public M_LevelDTO(int seq, String total, String hr, String payment, String reservation, String message,
			String task) {
		super();
		this.seq = seq;
		this.total = total;
		this.hr = hr;
		this.payment = payment;
		this.reservation = reservation;
		this.message = message;
		this.task = task;
	}
	public int getSeq() {
		return seq;
	}
	public void setSeq(int seq) {
		this.seq = seq;
	}
	public String getTotal() {
		return total;
	}
	public void setTotal(String total) {
		this.total = total;
	}
	public String getHr() {
		return hr;
	}
	public void setHr(String hr) {
		this.hr = hr;
	}
	public String getPayment() {
		return payment;
	}
	public void setPayment(String payment) {
		this.payment = payment;
	}
	public String getReservation() {
		return reservation;
	}
	public void setReservation(String reservation) {
		this.reservation = reservation;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getTask() {
		return task;
	}
	public void setTask(String task) {
		this.task = task;
	}
}
