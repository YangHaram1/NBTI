package com.nbti.dto;

public class DocSubDTO {
	
	private int doc_sub_seq;
	private String doc_sub_name;
	private int doc_form_seq;
	private String preservation_period;
	
	public DocSubDTO(int doc_sub_seq, String doc_sub_name, int doc_form_seq, String preservation_period) {
		super();
		this.doc_sub_seq = doc_sub_seq;
		this.doc_sub_name = doc_sub_name;
		this.doc_form_seq = doc_form_seq;
		this.preservation_period = preservation_period;
	}

	public DocSubDTO() {
		super();
	}

	public int getDoc_sub_seq() {
		return doc_sub_seq;
	}

	public void setDoc_sub_seq(int doc_sub_seq) {
		this.doc_sub_seq = doc_sub_seq;
	}

	public String getDoc_sub_name() {
		return doc_sub_name;
	}

	public void setDoc_sub_name(String doc_sub_name) {
		this.doc_sub_name = doc_sub_name;
	}

	public int getDoc_form_seq() {
		return doc_form_seq;
	}

	public void setDoc_form_seq(int doc_form_seq) {
		this.doc_form_seq = doc_form_seq;
	}

	public String getPreservation_period() {
		return preservation_period;
	}

	public void setPreservation_period(String preservation_period) {
		this.preservation_period = preservation_period;
	}
	
	
	
	

}
