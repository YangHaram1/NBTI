package com.nbti.controllers;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.lang.reflect.Type;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.nbti.commons.RealpathConfig;
import com.nbti.dto.FilesDTO;
import com.nbti.dto.MembersDTO;
import com.nbti.services.FilesService;
import com.nbti.services.MembersService;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.websocket.server.PathParam;

@RestController
@RequestMapping("/files")
public class FilesController {
	
	@Autowired
	private HttpSession session;
	@Autowired
	private FilesService serv;
	
	@Autowired
	private MembersService mserv;
	
	private final Gson gson = new Gson();
	
	@GetMapping("/downloadChat")
	public void download(@RequestParam String oriname,@RequestParam String sysname, HttpServletResponse response) throws Exception{
		String realpath= RealpathConfig.realpath +"chat";
		File target =new File(realpath+"/"+sysname);
		
		oriname =new String(oriname.getBytes(),"ISO-8859-1");
		response.setHeader("content-disposition", "attachment;filename=\""+oriname+"\"");
		try(DataInputStream dis = new DataInputStream(new FileInputStream(target));
			DataOutputStream dos = new DataOutputStream(response.getOutputStream());){
			byte[] fileContents =new byte[(int)target.length()];
			dis.readFully(fileContents);
			dos.write(fileContents);
			dos.flush();	
		}
	}
	
	@PutMapping("mypageUpdate")
	public ResponseEntity<Void> update(@RequestPart("updatedData")  String updatedData, @RequestPart(value="file", required = false) MultipartFile file) throws Exception {
		String id = (String)session.getAttribute("loginID");
		MembersDTO dto=new MembersDTO();
		Type mapType = new TypeToken<Map<String, String>>() {}.getType();
		Map<String, String> map = gson.fromJson(updatedData, mapType);
		dto.setId(id);
		dto.setAddress(map.get("address"));
		dto.setEmail(map.get("email"));
		dto.setMember_call(map.get("member_call"));
		//System.out.println(dto.getAddress() +":"+ dto.getEmail() +":"+ dto.getMember_call());
		serv.mypageUpdate(dto, file);
		return ResponseEntity.ok().build();
	}
	
	@GetMapping("/getFiles/{seq}")
	public List<FilesDTO> getList(@PathVariable int seq){
//		System.out.println("파일 부모 게시글 번호 확인 : "+seq);
		return serv.getList(seq);
	}
	
	// 전자결재 파일 다운로드
	@GetMapping("/downloadApproval")
	public void downloadApproval(@RequestParam String oriname,@RequestParam String sysname, @RequestParam String temp_seq,HttpServletResponse response) throws Exception{
		 System.out.println(oriname + " :" + sysname);
		    String realpath = RealpathConfig.realpath + "approval" + File.separator + temp_seq;
		    File target = new File(realpath + "/" + sysname);

		    if (!target.exists() || !target.isFile()) {
		        response.sendError(HttpServletResponse.SC_NOT_FOUND, "File not found");
		        return;
		    }

		    // Set content type based on file extension
		    String contentType;
		    if (sysname.endsWith(".jpg") || sysname.endsWith(".jpeg")) {
		        contentType = "image/jpeg";
		    } else if (sysname.endsWith(".png")) {
		        contentType = "image/png";
		    } else if (sysname.endsWith(".pdf")) {
		        contentType = "application/pdf";
		    } else {
		        contentType = "application/octet-stream";
		    }

		    response.setContentType(contentType);
		    response.setHeader("Content-Disposition", "attachment; filename=\"" + new String(oriname.getBytes("UTF-8"), "ISO-8859-1") + "\"");

		    try (InputStream in = new FileInputStream(target); OutputStream out = response.getOutputStream()) {
		        byte[] buffer = new byte[4096];
		        int bytesRead;
		        while ((bytesRead = in.read(buffer)) != -1) {
		            out.write(buffer, 0, bytesRead);
		        }
		        out.flush();
		    }
	}
	
	
	@ExceptionHandler(Exception.class)
	public String exceptionHandler(Exception e) {
		e.printStackTrace();
		return "error";
	}
	
	
	
}
