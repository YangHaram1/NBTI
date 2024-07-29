package com.nbti.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nbti.dto.MembersDTO;
import com.nbti.services.MembersService;

import jakarta.servlet.http.HttpSession;
//import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/members")
public class MembersController {
	
	@Autowired
	private MembersService mServ;
	
	@Autowired
	private HttpSession session;
	
	@GetMapping
	public MembersDTO myPage() {
		String id = (String)session.getAttribute("loginID");
		System.out.println(id);
		
		return mServ.selectMyData(id);
	}
	
	@PutMapping
	public ResponseEntity<Void> update(@RequestBody MembersDTO dto) {
		String id = (String)session.getAttribute("loginID");
		dto.setId(id);
		System.out.println(dto.getAddress() +":"+ dto.getEmail() +":"+ dto.getMember_call());
		mServ.updateMyData(dto);
		return ResponseEntity.ok().build();
	}
    @GetMapping("/selectAll")
    public ResponseEntity<List<MembersDTO>> selectAll() {
        List<MembersDTO> members = mServ.selectAll();
        return ResponseEntity.ok(members);  // HTTP 200 OK와 함께 members를 반환
    }
	
}
