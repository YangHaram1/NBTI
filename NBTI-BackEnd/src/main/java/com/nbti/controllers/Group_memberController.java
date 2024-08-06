package com.nbti.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nbti.dto.Group_memberDTO;
import com.nbti.services.Group_memberService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/group_member")
public class Group_memberController {
	
	@Autowired
	private Group_memberService serv;
	//@RequestParam(required=true)
	@Autowired
	private HttpSession session;
	
	@PostMapping
	public ResponseEntity<Void> post(@RequestBody String[] members) throws Exception {
		int group_seq=(int)session.getAttribute("group_seq");
		String loginID= (String) session.getAttribute("loginID");
		serv.insert(members,group_seq,loginID);
		return ResponseEntity.ok().build(); // 200  	
	} 
	
	@DeleteMapping()
	public ResponseEntity<Void> delete(int group_seq) throws Exception{
		System.out.println(group_seq);
		String loginID= (String) session.getAttribute("loginID");
		serv.delete(group_seq,loginID);
		return ResponseEntity.ok().build();
	}
	
	@GetMapping
	public ResponseEntity<List<Group_memberDTO>> get(int group_seq) throws Exception{
		
		return ResponseEntity.ok(serv.members(group_seq));
	}
	
	@PatchMapping
	public ResponseEntity<Void> patch(int group_seq,@RequestParam(defaultValue = "0") int last_chat_seq,String name,String type) throws Exception{
		//System.out.println("업데이트 멤버 check");
		String loginID= (String) session.getAttribute("loginID");
		//System.out.println(last_chat_seq);
		if(name!=null) {
			serv.update_name(group_seq, loginID, name);
		}
		else if(last_chat_seq!=0){
			
			serv.update_check(group_seq,loginID,last_chat_seq);
			
		}
		else if(type.equals("alarm")){
			System.out.println("alarm");
			serv.update_alarm(group_seq, loginID);
		}
		else if(type.equals("bookmark")) {
			serv.update_bookmark(group_seq, loginID);
		}
		return ResponseEntity.ok().build();
		
	}
}
