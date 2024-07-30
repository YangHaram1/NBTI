package com.nbti.dto;

public class DocTypeDTO {
	
	private int doc_form_seq;
	private String doc_form_name;
	
	public DocTypeDTO(int doc_form_seq, String doc_form_name) {
		super();
		this.doc_form_seq = doc_form_seq;
		this.doc_form_name = doc_form_name;
	}
	
	public DocTypeDTO() {
		super();
	}
	
	public int getDoc_form_seq() {
		return doc_form_seq;
	}
	public void setDoc_form_seq(int doc_form_seq) {
		this.doc_form_seq = doc_form_seq;
	}
	public String getDoc_form_name() {
		return doc_form_name;
	}
	public void setDoc_form_name(String doc_form_name) {
		this.doc_form_name = doc_form_name;
	}
	
	
	

}
