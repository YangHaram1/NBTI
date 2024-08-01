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

import com.nbti.dto.ChatDTO;
import com.nbti.dto.Group_chatDTO;
import com.nbti.dto.Group_chatSizeDTO;
import com.nbti.dto.Group_memberDTO;
import com.nbti.services.ChatService;
import com.nbti.services.Group_chatService;
import com.nbti.services.Group_memberService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/group_chat")
public class Group_chatController {
	

	@Autowired
	private HttpSession session;
	
	
	
	@Autowired
	private Group_chatService serv;
	//@RequestParamm(required=true)
	
	
	@Autowired
	private Group_memberService mserv;
	
	@Autowired
	private ChatService cserv;
	
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
			Group_memberDTO dto= new Group_memberDTO(seq,list.get(0),0,"Y","N",list.get(1));
			member_list.add(dto);
			dto= new Group_memberDTO(seq,list.get(1),0,"Y","N",list.get(0));
			member_list.add(dto);
			
			mserv.insert(member_list);
		}
		
		return ResponseEntity.ok().build(); // 200  	
	} 
	
	
	@GetMapping
	public ResponseEntity<List<Group_chatSizeDTO>> get() throws Exception{
		String loginID= (String) session.getAttribute("loginID");
		List<Group_memberDTO> list= new ArrayList<>();
		list=mserv.list(loginID); //그멤버가 가지고있는 group_seq 뽑기
		
		List<Group_chatDTO> chatList=serv.getList(list); //group_chat 목록 뽑기 seq에 맞게..사실 지금은 필없지만 나중에 group_chat에 컬럼 생기면 유용함
		List<Group_chatSizeDTO> result=new ArrayList<>();

		if(chatList==null) {
			return ResponseEntity.ok(null);
		}
		
		for(int i=0;i<chatList.size();i++) {
			int size=0;
			Group_chatDTO dto = chatList.get(i);
			for (Group_memberDTO MemberDTO : list) {
				if(MemberDTO.getGroup_seq()==dto.getSeq()) {
					size=mserv.members(MemberDTO.getGroup_seq()).size();
					ChatDTO cdto=cserv.getLastDTO(dto.getSeq());
					result.add(new Group_chatSizeDTO(dto.getSeq(),MemberDTO.getName(),MemberDTO.getAlarm(),MemberDTO.getBookmark(),size,cdto));
					break;
				}
			}
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
