package com.nbti.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nbti.commons.EncryptionUtils;
import com.nbti.dto.DepartmentDTO;
import com.nbti.dto.JobDTO;
import com.nbti.dto.M_LevelDTO;
import com.nbti.dto.MembersDTO;
import com.nbti.dto.TeamsDTO;
import com.nbti.services.DepartmentService;
import com.nbti.services.JobService;
import com.nbti.services.M_LevelService;
import com.nbti.services.MembersService;
import com.nbti.services.TeamService;

import jakarta.servlet.http.HttpSession;
//import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/members")
public class MembersController {
	@Autowired
	private DepartmentService dServ;
	@Autowired
	private TeamService tServ;
	@Autowired
	private JobService jServ;
	@Autowired
	private MembersService mServ;
	@Autowired
	private M_LevelService lServ;
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
    @GetMapping("/selectDepartment")
    public ResponseEntity<List<DepartmentDTO>> selectDepartment(){
    	List<DepartmentDTO> dapt = dServ.selectDepartment();
    	return ResponseEntity.ok(dapt);
    }
    @GetMapping("/selectTeam")
    public ResponseEntity<List<TeamsDTO>> selectTeams(){
    	List<TeamsDTO> team = tServ.selectTeams();
    	return ResponseEntity.ok(team);
    }
    @GetMapping("/selectJob")
    public ResponseEntity<List<JobDTO>> selectJob(){
    	List<JobDTO> job = jServ.selectJob();
    	return ResponseEntity.ok(job);
    }
	@GetMapping("/selectLevel")
	public ResponseEntity<List<M_LevelDTO>>selectLevel(){
		List<M_LevelDTO> level = lServ.selectLevel();
		return ResponseEntity.ok(level);
	}
	
	
	@PostMapping
	public ResponseEntity<Void> insert(@RequestBody MembersDTO dto){
		String encryptedPassword = EncryptionUtils.getSHA512(dto.getPw());
	    dto.setPw(encryptedPassword);

		mServ.insert(dto);
		return ResponseEntity.ok().build();
	}
	
	// 작성일 24.07.30 
	// 작성자 김지연
	// 마이페이지 비밀번호 변경 시 기존 비밀번호 체크
	@PostMapping("/checkPw")
	public ResponseEntity<Boolean> checkPw(@RequestBody Map<String, String> request){
		String pw = EncryptionUtils.getSHA512(request.get("pw"));
		System.out.println("pw:" + pw);
		
		String id = (String)session.getAttribute("loginID");
		
		HashMap<String, String> map = new HashMap<String, String>();
		map.put("id", id);
		map.put("pw", pw);
		Boolean result = mServ.checkPw(map);
		return ResponseEntity.ok(result);
	}
	
	
	// 작성일 24.07.30 
	// 작성자 김지연
	// 마이페이지 비밀번호 변경
	@PostMapping("/changePw")
	public ResponseEntity<Boolean> changePw(@RequestBody Map<String, String> request){
		String pw = EncryptionUtils.getSHA512(request.get("pw"));
		System.out.println("pw:" + pw);
		String id = (String)session.getAttribute("loginID");
		HashMap<String, String> map = new HashMap<String, String>();
		map.put("id", id);
		map.put("pw", pw);
		Boolean result = mServ.changePw(map);
		return ResponseEntity.ok(result);
	}
	
}
