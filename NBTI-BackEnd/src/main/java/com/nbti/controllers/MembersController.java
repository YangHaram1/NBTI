package com.nbti.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Delete;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
import com.nbti.services.TeamsService;

import jakarta.servlet.http.HttpSession;
//import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/members")
public class MembersController {
	@Autowired
	private DepartmentService dServ;
	@Autowired
	private TeamsService tServ;
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
		
		
		return mServ.selectMyData(id);
	}
	 @GetMapping("/{id}")
	    public ResponseEntity<MembersDTO> selectById(@PathVariable("id") String id) {
	        MembersDTO member = mServ.selectMyData(id);
	        if (member != null) {
	            return ResponseEntity.ok(member);
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }
	@PutMapping
	public ResponseEntity<Void> update(@RequestBody MembersDTO dto) {
		String id = (String)session.getAttribute("loginID");
		dto.setId(id);
		System.out.println(dto.getAddress() +":"+ dto.getEmail() +":"+ dto.getMember_call());
		mServ.updateMyData(dto);
		return ResponseEntity.ok().build();
	}
	// 멤버테이블 전체 추출
    @GetMapping("/selectAll")
    public ResponseEntity<List<MembersDTO>> selectAll() {
        List<MembersDTO> members = mServ.selectAll();
        return ResponseEntity.ok(members);  // HTTP 200 OK와 함께 members를 반환
    }
    // 사용자 조회
    @GetMapping("/selectMembers")
    public ResponseEntity<java.util.List<Map<String, Object>>> selectMembers(){
        List<Map<String, Object>> selectMembers = mServ.getMembers();
        return ResponseEntity.ok(selectMembers);
    }
    // 부서 추출
    @GetMapping("/selectDepartment")
    public ResponseEntity<List<DepartmentDTO>> selectDepartment(){
    	List<DepartmentDTO> dapt = dServ.selectDepartment();
    	return ResponseEntity.ok(dapt);
    }
    
    // 팀 추출
    @GetMapping("/selectTeam")
    public ResponseEntity<List<TeamsDTO>> selectTeams(){
    	List<TeamsDTO> team = tServ.selectTeams();
    	return ResponseEntity.ok(team);
    }
    // 직급 추출
    @GetMapping("/selectJob")
    public ResponseEntity<List<JobDTO>> selectJob(){
    	List<JobDTO> job = jServ.selectJob();
    	return ResponseEntity.ok(job);
    }
    // 권한 추출
	@GetMapping("/selectLevel")
	public ResponseEntity<List<M_LevelDTO>>selectLevel(){
		List<M_LevelDTO> level = lServ.selectLevel();
		return ResponseEntity.ok(level);
	}
	
	// 암호화 회원가입
	@PostMapping
	public ResponseEntity<Void> insert(@RequestBody MembersDTO dto){
		String encryptedPassword = EncryptionUtils.getSHA512(dto.getPw());
	    dto.setPw(encryptedPassword);

		mServ.insert(dto);
		return ResponseEntity.ok().build();
	}
	// 관리자 사용자 수정
	@PutMapping("/updateUser")
	public ResponseEntity<Void> updateUser(@RequestBody MembersDTO dto){
		mServ.updateUser(dto);
		return ResponseEntity.ok().build();
	}
	// 관리자 회원 탈퇴
	@DeleteMapping("/deleteUser/{id}")
	public ResponseEntity<Void> deleteUser(@PathVariable("id") String id){
		mServ.deleteUser(id);
		return ResponseEntity.ok().build();
	}
	// 사용자목록 검색
	@GetMapping("/searchUser")
	public ResponseEntity<List<Map<String, Object>>> searchUser(@RequestParam String name){
	    List<Map<String, Object>> users = mServ.searchUser(name);
	    return ResponseEntity.ok(users);
	}
	// 사용자목록 팀 조회
	@GetMapping("/selectByTeam")
	public ResponseEntity<List<MembersDTO>> selectByTeam(@RequestParam String team_code){
		List<MembersDTO> byteam = mServ.selectByTeam(team_code);
		return ResponseEntity.ok(byteam);
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
		String pw = EncryptionUtils.getSHA512((String)request.get("pw"));
		System.out.println("pw:" + pw);
		String id = (String)session.getAttribute("loginID");
		HashMap<String, String> map = new HashMap<String, String>();
		map.put("id", id);
		map.put("pw", pw);
		Boolean result = mServ.changePw(map);
		return ResponseEntity.ok(result);
	}
	
	// 작성일 24.07.31 
	// 작성자 김지연
	// 팀별 사용자 검색
    @GetMapping("/searchMembers/{selectTeam}")
    public ResponseEntity<List<MembersDTO>> searchMembers(@PathVariable("selectTeam") String team){
        List<MembersDTO> selectMembers = mServ.searchMembers(team);
        return ResponseEntity.ok(selectMembers);
    }
    
    // 작성일 24.08.1 
 	// 작성자 김지연
 	// 접속한 아이디에 따른 이름, 팀코드, 팀명, 부서코드, 부서명, 관리자 권한 코드, 관리자 권한명 추출
     @GetMapping("/docData")
     public ResponseEntity<Map<String, Object>> docData(){
    	 String id = (String)session.getAttribute("loginID");
         Map<String, Object> memberData = mServ.memberData(id);
         return ResponseEntity.ok(memberData);
     }
	
    // 작성일 24.08.2
  	// 작성자 김지연
  	// 아이디에 따른 휴가일수 추출
      @GetMapping("/selectVacation")
      public ResponseEntity<String> selectVacation(){
     	 String id = (String)session.getAttribute("loginID");
         String day = String.valueOf(mServ.selectPeriod(id)); 
         return ResponseEntity.ok(day);
      }
      
      
      // 작성일 24.08.7
   	  // 작성자 김지연
      // 검색할 아이디에 따른 이름, 팀코드, 팀명, 부서코드, 부서명, 관리자 권한 코드, 관리자 권한명 추출
       @GetMapping("/approvaler/{id}")
       public ResponseEntity<Map<String, Object>> docData(@PathVariable String id){
          Map<String, Object> memberData = mServ.memberData(id);
          return ResponseEntity.ok(memberData);
       }
       
       // 작성일 24.08.12
       // 작성자 김지연
       // 검색할 아이디에 따른 이름, 팀코드, 팀명, 부서코드, 부서명, 관리자 권한 코드, 관리자 권한명 추출
       @PostMapping("/approvalSearch")
        public List<Map<String, Object>> approvalSearch(@RequestBody List<Map<String, Object>> approvalLine){
        	System.out.println("결재라인 확인 : " + approvalLine);
        	List<Map<String, Object>> list = mServ.approvalList(approvalLine);
        	//           Map<String, Object> memberData = mServ.memberData(id);
           return list;
        }
}
