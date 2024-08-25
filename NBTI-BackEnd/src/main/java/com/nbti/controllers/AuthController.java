package com.nbti.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nbti.commons.EncryptionUtils;
import com.nbti.dto.ChatDTO;
import com.nbti.dto.MembersDTO;
import com.nbti.dto.User_historyDTO;
import com.nbti.services.MembersService;
import com.nbti.services.User_historyService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/auth")
public class AuthController {

	// private MembersService mServ;
	@Autowired
	private HttpSession session;
	@Autowired
	private HttpServletRequest request;

	@Autowired
	private MembersService mServ;
	@Autowired
	private User_historyService uServ;

	@PostMapping
	public ResponseEntity<String> login(@RequestBody Map<String, String> maps, HttpServletResponse response)
			throws Exception {
		String encryptedPassword = EncryptionUtils.getSHA512(maps.get("pw"));
		MembersDTO dto = new MembersDTO();
		dto.setPw(encryptedPassword);
		dto.setId(maps.get("id"));
		
		String result = mServ.login(dto);
	    if (result == null) {
	        // 아이디 또는 비밀번호가 틀린 경우
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("아이디 또는 비밀번호를 확인하세요.");
	    } else if (result.equals("Y")) {
	        // ent_yn이 'Y'인 경우
	        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("휴직 중인 계정입니다.");
	    }

		Cookie cookie = new Cookie("SESSIONID", dto.getId());
//	    cookie.setPath("/");
//	    cookie.setHttpOnly(true); // JavaScript에서 접근 불가
//	    cookie.setSecure(true); // HTTPS에서만 전송
//	    cookie.setMaxAge(3600); // 쿠키 유효 기간 설정 (1시간)
//
//	    response.addCookie(cookie); // 응답에 쿠키를 추가
		String ip = request.getHeader("X-FORWARDED-FOR");
		if (ip == null || ip.isEmpty()) {
			ip = request.getRemoteAddr();
		}
		uServ.insert(new User_historyDTO(0, dto.getId(), ip, null));
		HttpSession session = request.getSession(); // HttpSession 객체 생성

		session.setAttribute("loginID", dto.getId()); // 로그인한 아이디의 세션을 담아둔다
		String id = (String) session.getAttribute("loginID");
		System.out.println("loginID : " + id);
		return ResponseEntity.ok(dto.getId()); // 로그인에 성공한 아이디를 돌려보낸다
	}

	@GetMapping
	public ResponseEntity<List<ChatDTO>> get() {

		// System.out.println(session.getAttribute("loginID"));
		ResponseEntity.status(HttpStatus.UNAUTHORIZED);
		return ResponseEntity.ok(null);
	}

	// 로그아웃
	@DeleteMapping
	public ResponseEntity<Void> logout() {
		System.out.println("로그아웃 확인");
		session.invalidate();
		return ResponseEntity.ok().build();
	}

	@ExceptionHandler(Exception.class)
	public String exceptionHandler(Exception e) {
		e.printStackTrace();
		return "error";
	}
	
    @PostMapping("/find-id")
    public ResponseEntity<String> findId(@RequestParam String email, @RequestParam String name) {
        String foundId = mServ.findIdByEmailAndName(email, name);
        if (foundId != null) {
            return ResponseEntity.ok(foundId);
        } else {
            return ResponseEntity.status(404).body("아이디를 찾을 수 없습니다.");
        }
    }

    @PostMapping("/verify-user")
    public ResponseEntity<Boolean> verifyUser(@RequestParam String id, @RequestParam String name, @RequestParam String birth) {
        boolean verified = mServ.verifyUser(id, name, birth);
        return ResponseEntity.ok(verified);  // true 또는 false 반환
    }
	@PostMapping("/updatePw")
	public ResponseEntity<Boolean> updatePw(@RequestBody Map<String, String> request) {
	    String newPassword = EncryptionUtils.getSHA512(request.get("newPassword"));
	    String id = request.get("id");

	    HashMap<String, String> map = new HashMap<>();
	    map.put("id", id);
	    map.put("pw", newPassword);

	    boolean result = mServ.changePw(map);
	    if (result) {
	        return ResponseEntity.ok(result);
	    } else {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
	    }
	}
}
