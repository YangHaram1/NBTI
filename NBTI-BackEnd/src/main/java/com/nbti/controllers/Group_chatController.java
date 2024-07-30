package com.nbti.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nbti.dto.Group_chatDTO;
import com.nbti.dto.Group_chatSizeDTO;
import com.nbti.dto.Group_memberDTO;
import com.nbti.services.Group_chatService;
import com.nbti.services.Group_memberService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/group_chat")
public class Group_chatController {
	
	
	@Autowired
	private Group_chatService serv;
	//@RequestParamm(required=true)
	
	@Autowired
	private HttpSession session;
	
	@Autowired
	private Group_memberService mserv;
	
	@PostMapping
	public ResponseEntity<Void> post(String member_id,String name) throws Exception {
		List<String> list =new ArrayList<>();
		String loginID= (String) session.getAttribute("loginID");
		
		list.add(member_id);
		list.add(loginID);
		boolean check=mserv.check(list);
		
		if(!check) {
			int seq=serv.insert(name);
			
			List<Group_memberDTO> member_list=new ArrayList<>();
			for(int i=0; i<list.size();i++) {
				Group_memberDTO dto= new Group_memberDTO(seq,list.get(i),"N","","");
				member_list.add(dto);
			}
			
			mserv.insert(member_list);
		}
		
		return ResponseEntity.ok().build(); // 200  	
	} 
	
	
	@GetMapping
	public ResponseEntity<List<Group_chatSizeDTO>> get() throws Exception{
		String loginID= (String) session.getAttribute("loginID");
		List<Group_memberDTO> list= new ArrayList<>();
		list=mserv.list(loginID);
		
		List<Group_chatDTO> chatList=serv.getList(list);
		List<Group_chatSizeDTO> result=new ArrayList<>();

		if(chatList==null) {
			return ResponseEntity.ok(null);
		}
		
		for(int i=0;i<chatList.size();i++) {
			int size=0;
			Group_chatDTO dto = chatList.get(i);
			for (Group_memberDTO MembetDTO : list) {
				if(MembetDTO.getGroup_seq()==dto.getSeq()) {
					size=mserv.members(MembetDTO.getGroup_seq()).size();
					break;
				}
			}
			result.add(new Group_chatSizeDTO(dto.getSeq(),dto.getName(),dto.getAlarm(),dto.getBookmark(),size));
		}
		
		if(list!=null)
		return ResponseEntity.ok(result);
		
		return ResponseEntity.ok().build();
	}
	
	
	@DeleteMapping()
	public ResponseEntity<Void> delete(int seq) throws Exception{
		serv.delete(seq);
		return ResponseEntity.ok().build();
	}
	
	@ExceptionHandler(Exception.class)
	public String exceptionHandler(Exception e) {
		e.printStackTrace();
		return "error";
	}
}
