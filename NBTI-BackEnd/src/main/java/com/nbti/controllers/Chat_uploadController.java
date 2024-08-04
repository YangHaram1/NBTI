package com.nbti.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.nbti.commons.RealpathConfig;
import com.nbti.services.FilesService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/chat_upload")
public class Chat_uploadController {

	
	@Autowired
	private HttpSession session;
	@Autowired
	private FilesService fsev;
	
	@PostMapping
	public ResponseEntity<List<Map<String, Object>>> post(@RequestParam int group_seq ,@RequestParam MultipartFile[] files) throws Exception {
		String loginID=(String)session.getAttribute("loginID");
		String realpath=RealpathConfig.realpath+"chat";
		List<Map<String, Object>> uploadList=fsev.upload(realpath, files, group_seq, loginID);
		return ResponseEntity.ok(uploadList); // 200
	}
	
	
	@ExceptionHandler(Exception.class)
	public String exceptionHandler(Exception e) {
		e.printStackTrace();
		return "error";
	}
}
