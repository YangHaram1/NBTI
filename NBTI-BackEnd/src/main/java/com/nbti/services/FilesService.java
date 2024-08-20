package com.nbti.services;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.JsonObject;
import com.nbti.commons.FileConfig;
import com.nbti.commons.ImageConfig;
import com.nbti.commons.RealpathConfig;
import com.nbti.dao.ApprovalDAO;
import com.nbti.dao.ApprovalLineDAO;
import com.nbti.dao.ChatDAO;
import com.nbti.dao.Chat_uploadDAO;
import com.nbti.dao.DocDraftDAO;
import com.nbti.dao.DocLeaveDAO;
import com.nbti.dao.DocVacationDAO;
import com.nbti.dao.FilesDAO;
import com.nbti.dao.Group_memberDAO;
import com.nbti.dao.MembersDAO;
import com.nbti.dao.ReferLineDAO;
import com.nbti.dto.ApprovalDTO;
import com.nbti.dto.ApprovalLineDTO;
import com.nbti.dto.ChatDTO;
import com.nbti.dto.Chat_uploadDTO;
import com.nbti.dto.DocDraftDTO;
import com.nbti.dto.DocLeaveDTO;
import com.nbti.dto.DocVacationDTO;
import com.nbti.dto.FilesDTO;
import com.nbti.dto.Group_memberDTO;
import com.nbti.dto.MembersDTO;
import com.nbti.dto.ReferLineDTO;

@Service
public class FilesService {

	@Autowired
	private Chat_uploadDAO dao;

	@Autowired
	private ChatDAO cdao;

	@Autowired
	private Group_memberDAO mdao;

	@Autowired
	private MembersDAO memberdao;

	@Autowired
	private ApprovalLineDAO aldao;

	@Autowired
	private ReferLineDAO rldao;

	@Autowired
	private ApprovalDAO adao;

	@Autowired
	private DocDraftDAO dddao;

	@Autowired
	private DocVacationDAO dvdao;

	@Autowired
	private DocLeaveDAO dldao;

	@Autowired
	private FilesDAO fdao;

	@Transactional
	public List<Map<String, Object>> upload(String realpath, MultipartFile[] files, int group_seq, String member_id)
			throws Exception {

		File realPathFile = new File(realpath);
		if (!realPathFile.exists()) {
			realPathFile.mkdir();
		}
		List<Map<String, Object>> uploadList = new ArrayList<>();
		if (files != null) {
			for (MultipartFile file : files) {
				if (file.getSize() == 0) {
					continue;
				}
				String oriName = file.getOriginalFilename();
				String sysName = UUID.randomUUID() + "_" + oriName;
				file.transferTo(new File(realpath + "/" + sysName));
				int code = processFile(file);
				int upload_seq = dao.insert(new Chat_uploadDTO(0, oriName, sysName, group_seq, member_id, code));
				Map<String, Object> map = new HashMap<>();
				map.put("upload_seq", upload_seq);
				map.put("oriname", oriName);
				map.put("sysname", sysName);
				map.put("code", code);
				String fileMessage = map.get("oriname") + "*" + map.get("sysname") + "*" + map.get("code");
				ChatDTO dto = new ChatDTO(0, member_id, fileMessage, null, group_seq, (int) (map.get("upload_seq")));
				dto = cdao.insert(dto);
				map.put("dto", dto);
				uploadList.add(map);
			}
		}
		return uploadList;
	}

	public String determineFileType(MultipartFile file) {// 파일타입 구별하기
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

	public int processFile(MultipartFile file) {// 구별후 처리 로직
		String fileType = determineFileType(file);
		if ("IMAGE".equals(fileType)) {
			// 이미지 파일 처리 로직
			return ImageConfig.image;
		} else {
			// 비 이미지 파일 처리 로직
			return ImageConfig.file;
		}
	}

	public List<Map<String, Object>> fileListByGroup_seq(String member_id) throws Exception {
		List<Map<String, Object>> list = new ArrayList<>();
		List<Group_memberDTO> mlist = mdao.list(member_id);
		for (Group_memberDTO dto : mlist) {
			Map<String, Object> group_chatObject = new HashMap<>();
			group_chatObject.put("group_seq", dto.getGroup_seq());
			group_chatObject.put("name", dto.getName());
			List<Chat_uploadDTO> ulist = dao.listByGroup_seq(dto.getGroup_seq());
			group_chatObject.put("list", ulist);
			list.add(group_chatObject);
		}

		return list;
	}

	@Transactional
	public void delete(int seq) throws Exception {
		dao.deleteBySeq(seq);
		cdao.deleteByUploadSeq(seq);
	}

	@Transactional // 마이페이지 수정 파일 포함
	public void mypageUpdate(MembersDTO dto, MultipartFile file) throws Exception {
		String realpath = RealpathConfig.realpath + "avatar" + File.separator + dto.getId();
		File realPathFile = new File(realpath);
		if (!realPathFile.exists()) {
			realPathFile.mkdir();
		}
		if (file != null) {
			String oriName = file.getOriginalFilename();
			String sysName = UUID.randomUUID() + "_" + oriName;
			// 기존 파일이 존재하는 경우 삭제
			File directory = new File(realpath);
			deleteAllFilesInDirectory(directory);
			file.transferTo(new File(realpath + "/" + sysName));
			dto.setMember_img(sysName);
			memberdao.updateMyData(dto);
		} else {
			memberdao.updateMyDataNoImg(dto);
		}

	}

	// 파일이 포함된 디렉토리의 모든 파일 삭제
	private void deleteAllFilesInDirectory(File directory) {
		if (directory.isDirectory()) {
			File[] files = directory.listFiles();
			if (files != null) {
				for (File file : files) {
					if (file.isFile()) {
						file.delete();
					}
				}
			}
		}
	}

	// 게시판 이미지
	public Map<String, String> boardImage(String member_id, int board_code, String check, MultipartFile file)
			throws Exception {
		String Path = "board" + File.separator + "images";
		String realPath = RealpathConfig.realpath + Path;
		System.out.println(realPath);
		File uploadPath = new File(realPath);
		Map<String, String> maps = new HashMap<>();
		if (!uploadPath.exists()) {
			uploadPath.mkdir();// 메이크 디렉토리
		}
		if (file != null) {
			// 파일저장하고
			String oriName = file.getOriginalFilename();
			String sysName = UUID.randomUUID() + "_" + oriName;
			File imageFile = new File(realPath + "/" + sysName);
			file.transferTo(imageFile);
			System.out.println(sysName);
			// 이미지 높이 넓이 가저오고
			BufferedImage image = null;
			int width = 0;
			int height = 0;
			image = ImageIO.read(imageFile);
			if (image != null) {
				width = image.getWidth();
				height = image.getHeight();
			}

			// 객체로 저정하기

			maps.put("width", String.valueOf(width));
			maps.put("height", String.valueOf(height));
			maps.put("sysname", sysName);
			
//			if (oriName != null && check.equals("true")) {
//				FilesDTO fdto = new FilesDTO(0, oriName, sysName, board_code, FileConfig.borad);
//				fdao.insertApprovalFile(fdto);
//			} else {
//				// 파일 삭제
//				if (imageFile.exists()) {
//					if (imageFile.delete()) {
//						System.out.println("파일 삭제 성공");
//					} else {
//						System.out.println("파일 삭제 실패");
//					}
//				} else {
//					System.out.println("파일이 존재하지 않습니다.");
//				}
//			}
		}

		return maps;
	}

	// 작성일 24.08.4
	// 작성자 김지연
	// 전자결재 결재라인, 참조라인, 공통정보, 문서별 데이터, 첨부파일 트랜잭션으로 저장
	@Transactional(rollbackFor = IOException.class)
	public void write(int type, ApprovalDTO adto, List<ApprovalLineDTO> alist, List<ReferLineDTO> rlist,
			DocDraftDTO ddto, DocVacationDTO dvdto, DocLeaveDTO dldto, MultipartFile[] files) {

		// 공통정보 입력
		int temp_seq = adao.write(adto);

		// 문서별 내용 입력
		if (type == 1) {
			ddto.setDraft_seq(temp_seq);
			dddao.insert(ddto);
		} else if (type == 3) {
			dvdto.setVacation_seq(temp_seq);
			dvdao.insert(dvdto);
		} else if (type == 2) {
			dldto.setLeave_seq(temp_seq);
			dldao.insert(dldto);
		}

		// 결재라인 입력
		for (ApprovalLineDTO dto : alist) {
			dto.setTemp_seq(temp_seq);
			aldao.insert(dto);
		}

		if (rlist.size() > 0) {
			// 참조라인 입력
			for (ReferLineDTO dto : rlist) {
				dto.setTemp_seq(temp_seq);
				rldao.insert(dto);
			}
		}

		// 첨부파일 추가
		String realpath = RealpathConfig.realpath + "approval" + File.separator + temp_seq + File.separator;
		File realPathFile = new File(realpath);
		FilesDTO dto = new FilesDTO();
		if (!realPathFile.exists()) {
			realPathFile.mkdirs();
		}

		if (files != null) {
			for (MultipartFile file : files) {
				String oriname = file.getOriginalFilename();
				String sysname = UUID.randomUUID() + "_" + oriname;
				dto.setSysname(sysname);
				dto.setOriname(oriname);
				dto.setParent_seq(temp_seq);
				dto.setCode(2);
				fdao.insertApprovalFile(dto);
				File targetFile = new File(realPathFile, sysname);
				try {
					file.transferTo(targetFile);
				} catch (IOException e) {
					e.printStackTrace();
					// 적절한 예외 처리를 추가합니다.
				}
			}
		} else {
			System.out.println("첨부파일 없음");
		}
	}

	public List<FilesDTO> getList(int seq) {
		return fdao.getList(seq);
	}

	// 유나
	// 게시판 파일 목록 출력
	public List<FilesDTO> selectList(int seq, int code) {
		return fdao.selectList(seq, code);
	}

	// 게시판 파일 삭제
	public void deleteBoardFile(int[] seq) {

		for (int s : seq) {
			Map<String, Integer> map = new HashMap<>();
			map.put("seq", s);
			map.put("code", FileConfig.borad);

			fdao.deleteBoardFile(map);
		}
	}

}
