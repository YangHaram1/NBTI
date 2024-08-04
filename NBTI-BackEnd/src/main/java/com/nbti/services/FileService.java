package com.nbti.services;

import java.io.File;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.nbti.dao.Chat_uploadDAO;
import com.nbti.dto.Chat_uploadDTO;

@Service
public class FileService {
	
	@Autowired
	private Chat_uploadDAO dao;
	
	public void upload(String realpath,MultipartFile[] files,int group_seq,String member_id,int code) throws Exception {
		File realPathFile =new File(realpath);
		if(!realPathFile.exists()) {realPathFile.mkdir();}
		
		if(files!=null) {
			for(MultipartFile file:files) {
				if(file.getSize()==0) {
					continue;
				}
				String oriName =file.getOriginalFilename();
				String sysName= UUID.randomUUID() +"_"+ oriName;
				file.transferTo(new File(realpath+"/"+sysName));
				dao.insert(new Chat_uploadDTO(0,oriName,sysName,group_seq,member_id,code));
			}
		}		
	}
}
