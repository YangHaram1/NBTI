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
	
	public List<ReserveDTO> waitingList () throws Exception{
		return mybatis.selectList("Reserve.waitingList");
	}
	public List<ReserveDTO> waitList () throws Exception{
		return mybatis.selectList("Reserve.waitList");
	}
	
	// 예약 상태 업데이트 메서드
    public void update(int reservationSeq, String state) throws Exception {
        // 상태와 예약 번호를 이용하여 업데이트
        Map<String, Object> params = new HashMap<>();
        params.put("seq", reservationSeq);
        params.put("state", state);
        mybatis.update("Reserve.updateReservationStatus", params); // 매퍼 호출
    }





}
