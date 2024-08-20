package com.nbti.services;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.nbti.commons.FileConfig;
import com.nbti.dao.BoardDAO;
import com.nbti.dao.FilesDAO;
import com.nbti.dao.LikesDAO;
import com.nbti.dao.ReplyDAO;
import com.nbti.dto.BoardDTO;
import com.nbti.dto.FilesDTO;
import com.nbti.dto.ReplyDTO;

@Service
public class BoardService {
	
	@Autowired
	private BoardDAO bdao;
	@Autowired
	private ReplyDAO rdao;
	@Autowired
	private LikesDAO ldao;
	
	@Autowired
	private FilesDAO fdao;
	
	// 목록 출력
	public List<BoardDTO> selectAll(Map<String, Object> map){
		return bdao.selectAll(map);
	}
	// 게시글 총 개수 (페이지네이션)
	public int getBoardCount(Map<String, Object> map) {
		return bdao.getBoardCount(map);
	}
	
	// 내 글 목록
	public List<BoardDTO> selectMyList(Map<String, Object> map){
		return bdao.selectMyList(map);
	}
	// 내 글 총 개수 (페이지네이션)
	public int getMyListCount(Map<String, Object> map) {
		return bdao.getMyListCount(map);
	}

	
	// 게시글 출력
	public BoardDTO selectBoard(Map<String, Integer> map) {
		return bdao.selectBoard(map);
	}
	
	// 게시글 작성
	@Transactional
	public void insert(String realpath,MultipartFile[] files,BoardDTO dto) throws IllegalStateException, IOException {
		
		File realPathFile =new File(realpath);
		if(!realPathFile.exists()) {realPathFile.mkdir();}
		dto=bdao.insert(dto);
		
		if(files!=null) {
			for(MultipartFile file:files) {
				if(file.getSize()==0) {
					continue;
				}
				String oriName =file.getOriginalFilename();
				String sysName= UUID.randomUUID() +"_"+ oriName;
				file.transferTo(new File(realpath+"/"+sysName));
				FilesDTO fdto= new FilesDTO(0,oriName,sysName,dto.getSeq(),FileConfig.borad);
				fdao.insertApprovalFile(fdto);
			}
		}		
		
	}


	// 게시글 삭제
	public void delete(int seq) {
		bdao.delete(seq);
	}
	
	// 게시글 수정
	public void modify(BoardDTO dto) {
		bdao.modify(dto);
	}

	// 조회수 증가
	public void updateViewCount(HashMap<String, Integer> map) {
		bdao.updateViewCount(map);
	}
	
	// 중요(북마크) 게시글 출력
	public List<BoardDTO> bookmarkList(Map<String, Object> map){
		return bdao.bookmarkList(map);
	}
	
	

	//============================[ 메 인 ]=============================
	// 공지 게시판 출력
	public List<BoardDTO> selectNotice(){
		return bdao.selectNotice();
	}
	
	
	
	// 자유 게시판 & 댓글 출력
	public Map<String, Object> selectFree(){
	
		List<BoardDTO> list = bdao.selectFree(); // 게시판 리스트 가져오기
		
		List<List<ReplyDTO>> rlist = new ArrayList<>(); // 댓글 리스트 가져오기
		
		for (BoardDTO dto : list) {
			int seq = dto.getSeq(); // 게시글의 seq 담기
			
			List<ReplyDTO> replies = rdao.selectFreeReply(seq);
			
			for(ReplyDTO rdto : replies) { // count 세팅을 위한 로직 
				int reply_seq = rdto.getSeq();
				int count = ldao.likeCount(reply_seq); // 해당 댓글 seq에 맞는 좋아요 개수 가져오기
						
				rdto.setCount(count);
			}
			
			rlist.add(replies); // 게시글의 seq에 맞는 댓글을 댓글 리스트에 추가
		}
			
		Map<String, Object> map = new HashMap<>();
		map.put("list", list);
		map.put("rlist", rlist);
		
		return map; // map에 담아서 return
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
