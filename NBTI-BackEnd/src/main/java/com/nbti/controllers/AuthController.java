package com.nbti.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nbti.commons.EncryptionUtils;
import com.nbti.dto.ChatDTO;
import com.nbti.dto.MembersDTO;
import com.nbti.dto.User_historyDTO;
import com.nbti.services.MembersService;
import com.nbti.services.User_historyService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/auth")
public class AuthController {
	
	
	
	//private MembersService mServ;
	@Autowired
	private HttpSession session;
	@Autowired
	private HttpServletRequest request;
	
	@Autowired
	private MembersService mServ;
	@Autowired
	private User_historyService uServ;
	
	   @PostMapping
	   public ResponseEntity<String> login(@RequestBody MembersDTO dto) throws Exception {
		   String encryptedPassword = EncryptionUtils.getSHA512(dto.getPw());
	        dto.setPw(encryptedPassword);
		   
	      boolean result = mServ.login(dto);   
	      
	      System.out.println(dto.getId()+":"+dto.getPw());
	      System.out.println(result);
	      if(!result) {
	         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("login Failed");
	         // 실패했다고 알려주기위해 우리가 임의로 상태를 알려준다
	      }
	      
	      String ip = request.getHeader("X-FORWARDED-FOR");
	        if (ip == null || ip.isEmpty()) {
	            ip = request.getRemoteAddr();
	        }
	        uServ.insert(new User_historyDTO(0,dto.getId(),ip,null));
	      session.setAttribute("loginID", dto.getId()); // 로그인한 아이디의 세션을 담아둔다
	      return ResponseEntity.ok(dto.getId()); // 로그인에 성공한 아이디 를 돌려보낸다
	   }
	
	   @GetMapping
	   public ResponseEntity<List<ChatDTO>> get(){
			
		   //System.out.println(session.getAttribute("loginID"));
		   ResponseEntity.status(HttpStatus.UNAUTHORIZED);
		   return ResponseEntity.ok(null);
	   }
	
	   //로그아웃
	   @DeleteMapping
	   public ResponseEntity<Void> logout(){
		   System.out.println("로그아웃 확인");
		   session.invalidate();
		   return ResponseEntity.ok().build();
	   }
	   
	   @ExceptionHandler(Exception.class)
		public String exceptionHandler(Exception e) {
			e.printStackTrace();
			return "error";
		}
}
