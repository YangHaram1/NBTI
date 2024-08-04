package com.nbti.services;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.nbti.commons.ImageConfig;
import com.nbti.dao.Chat_uploadDAO;
import com.nbti.dto.Chat_uploadDTO;

@Service
public class FilesService {
	
	@Autowired
	private Chat_uploadDAO dao;
	
	public List<Map<String, Object>> upload(String realpath,MultipartFile[] files,int group_seq,String member_id) throws Exception {
		File realPathFile =new File(realpath);
		if(!realPathFile.exists()) {realPathFile.mkdir();}
		List<Map<String, Object>> uploadList= new ArrayList<>();
		if(files!=null) {
			for(MultipartFile file:files) {
				if(file.getSize()==0) {
					continue;
				}
				String oriName =file.getOriginalFilename();
				String sysName= UUID.randomUUID() +"_"+ oriName;
				file.transferTo(new File(realpath+"/"+sysName));
				int code=processFile(file);
				int upload_seq=dao.insert(new Chat_uploadDTO(0,oriName,sysName,group_seq,member_id,code));
				Map<String, Object> map=new HashMap<>();
				map.put("upload_seq", upload_seq);
				map.put("oriname", oriName);
				map.put("sysname", sysName);
				uploadList.add(map);
			}
		}		
		return uploadList;
	}
	
	
	public String determineFileType(MultipartFile file) {//파일타입 구별하기
        String contentType = file.getContentType();
        
        // MIME 타입으로 확인
        if (contentType != null && contentType.startsWith("image/")) {
            return "IMAGE";
        }
        
        // 파일 확장자로 확인 (보완적인 방법)
        String originalFilename = file.getOriginalFilename();
        if (originalFilename != null && originalFilename.matches(".*\\.(jpg|jpeg|png|gif)$")) {
            return "IMAGE";
        }

        return "NON_IMAGE";
    }

    public int processFile(MultipartFile file) {//구별후 처리 로직
        String fileType = determineFileType(file);
        if ("IMAGE".equals(fileType)) {
            // 이미지 파일 처리 로직
            return ImageConfig.image;
        } else {
            // 비 이미지 파일 처리 로직
            return ImageConfig.file;
        }
    }
	
	
	
}
