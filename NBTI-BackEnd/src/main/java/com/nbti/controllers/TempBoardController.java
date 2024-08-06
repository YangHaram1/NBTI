package com.nbti.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.javassist.compiler.SymbolTable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nbti.dto.BoardDTO;
import com.nbti.dto.TempBoardDTO;
import com.nbti.services.TempBoardService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/tempBoard")
public class TempBoardController {

	@Autowired
	private TempBoardService tserv;
	@Autowired
	private HttpSession session;
	
	
	// 임시저장
	@PostMapping("/tempSave")
	public ResponseEntity<Integer> insert(@RequestBody BoardDTO dto){
	
		String member_id = (String) session.getAttribute("loginID");
		dto.setMember_id(member_id);
		
		int result = tserv.insert(dto);
		return ResponseEntity.ok(result);

	}

	// 임시저장 목록 출력
	@GetMapping("/tempList")
	public ResponseEntity<List<TempBoardDTO>> selectAll(){
		
		String member_id = (String) session.getAttribute("loginID");
		
		List<TempBoardDTO> list = tserv.selectAll(member_id);
		
		return ResponseEntity.ok(list);
	}
	
	
//	@GetMapping("/tempList/{code}")
//	public ResponseEntity<List<TempBoardDTO>> selectAll(@PathVariable int code){
//		
//		String member_id = (String) session.getAttribute("loginID");
//		
//		Map<String, Object> map = new HashMap<>();
//		map.put("code",code);
//		map.put("member_id", member_id);
//		
//		System.out.println(code);
//		System.out.println(member_id);
//		
//		List<TempBoardDTO> list = tserv.selectAll(map);
//		
//		return ResponseEntity.ok(list);
//	}

	// 임시저장 삭제
	@DeleteMapping("/delete/{seq}")
	public ResponseEntity<Integer> delete(@PathVariable int seq){
		
		int result = tserv.delete(seq);
		return ResponseEntity.ok(result);
	}
	
	
	
}
