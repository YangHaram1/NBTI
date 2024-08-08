package com.nbti.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nbti.dto.ReserveDTO;

@Repository
public class ReserveDAO {
	@Autowired
	private SqlSession mybatis;
	
	public void insert (ReserveDTO dto) throws Exception{
		System.out.println(dto.getMember_id());
		System.out.println(dto.getSeq());
		System.out.println(dto.getReserve_title_code());
		System.out.println(dto.getState());
		System.out.println(dto.getStart_time());
		System.out.println(dto.getEnd_time());
		mybatis.insert("Reserve.insert",dto);
	}
	
	public List<ReserveDTO> waitingList (String memberId) throws Exception{
		return mybatis.selectList("Reserve.waitingList",memberId);
	}
	public List<ReserveDTO> waitList () throws Exception{
		return mybatis.selectList("Reserve.waitList");
	}
	
	// 승인
    public void update(int reservationSeq, String state) throws Exception {
        // 상태와 예약 번호를 이용하여 업데이트
        Map<String, Object> params = new HashMap<>();
        params.put("seq", reservationSeq);
        params.put("state", state);
        mybatis.update("Reserve.updateReservationStatus", params); // 매퍼 호출
    }
    
    // 반려
    public void reject(int reservationSeq, String state) throws Exception {
    	// 상태와 예약 번호를 이용하여 업데이트
    	Map<String, Object> params = new HashMap<>();
    	params.put("seq", reservationSeq);
    	params.put("state", state);
    	mybatis.update("Reserve.reject", params); // 매퍼 호출
    }
    
    //승인 관리 - 승인 목록 출력
    public List<ReserveDTO> approveList (String memberId) throws Exception {
    	return mybatis.selectList("Reserve.approveList",memberId);
    }
    
    //승인 관리 - 반려 목록 출력
    public List<ReserveDTO> rejectList () throws Exception {
    	return mybatis.selectList("Reserve.rejectList");
    }
    
    //캘린더 car
    public List<ReserveDTO> carList () throws Exception {
    	return mybatis.selectList("Reserve.carList");
    }

    //캘린더 suppliesList
    public List<ReserveDTO> suppliesList () throws Exception {
    	return mybatis.selectList("Reserve.suppliesList");
    }
    
    //캘린더 meetingRoomList
    public List<ReserveDTO> meetingRoomList () throws Exception {
    	return mybatis.selectList("Reserve.meetingRoomList");
    }
    
    //예약 취소
//    public void delete(int seq) throws Exception{
//    	mybatis.delete("Reserve.delete",seq);
//    }




}
