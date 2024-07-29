package com.nbti.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nbti.dto.ChatDTO;
import com.nbti.dto.MembersDTO;
import com.nbti.services.MembersService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/auth")
public class AuthController {
	
	
	
	//private MembersService mServ;
	@Autowired
	private HttpSession session;
	
	@Autowired
	private MembersService mServ;
	
	   @PostMapping
	   public ResponseEntity<String> login(@RequestBody MembersDTO dto) {
	      boolean result = mServ.login(dto);   
	      
	      System.out.println(dto.getId()+":"+dto.getPw());
	      System.out.println(result);
	      if(!result) {
	         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("login Failed");
	         // 실패했다고 알려주기위해 우리가 임의로 상태를 알려준다
	      }
	      session.setAttribute("loginID", dto.getId()); // 로그인한 아이디의 세션을 담아둔다
	      return ResponseEntity.ok(dto.getId()); // 로그인에 성공한 아이디 를 돌려보낸다
	   }
	
	@GetMapping
	public ResponseEntity<List<ChatDTO>> get(){
		
		//System.out.println(session.getAttribute("loginID"));
		ResponseEntity.status(HttpStatus.UNAUTHORIZED);
		return ResponseEntity.ok(null);
	}
}
