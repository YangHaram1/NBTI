package com.nbti.services;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nbti.dao.AttendanceDAO;
import com.nbti.dto.AttendanceDTO;

@Service
public class AttendanceService {
	@Autowired
	private AttendanceDAO aDao;
	
	public int clockIn(String memberId) {
	    AttendanceDTO dto = new AttendanceDTO();
	    dto.setMember_id(memberId);

	    // 현재 시간을 LocalDateTime으로 가져옴
	    LocalDateTime now = LocalDateTime.now();
	    // LocalDateTime을 Timestamp로 변환
	    Timestamp timestamp = Timestamp.valueOf(now);

	    dto.setToday(timestamp);
	    dto.setStart_date(timestamp);

	    AttendanceDTO resultDto = aDao.insert(dto); // insert 메소드 호출 후 결과 DTO 반환
	    return resultDto.getSeq(); // 자동 생성된 seq 값 반환
	}
    public void clockOut(int seq, Timestamp end_date) {
        aDao.updateClockOut(seq, end_date);
    }
}
