package com.nbti.dto;

import java.sql.Timestamp;

public class ListDTO {
	
	private int temp_seq; // 임시번호
	private Timestamp approval_date; // 기안일 
	private String doc_sub_name, emergency, title, file_yn, member_id; 
	                // 결재양식 이름, 긴급유무, 제목, 첨부파일유무, 작성자
}
