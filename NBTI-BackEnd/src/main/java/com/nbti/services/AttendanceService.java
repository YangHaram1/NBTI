package com.nbti.services;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

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
        aDao.insert(dto);
        return dto.getSeq(); // 자동 생성된 seq 값을 반환
    }
    
    public void clockOut(String memberId, Timestamp endDate) {
        AttendanceDTO currentRecord = aDao.getCurrentStatus(memberId);
        if (currentRecord != null) {
            aDao.updateClockOut(currentRecord.getSeq(), endDate);
        }
    }
    
    public Map<String, Object> getStatus(String memberId) {
        AttendanceDTO status = aDao.getCurrentStatus(memberId);
        Map<String, Object> result = new HashMap<>();
        if (status != null) {
            result.put("start_date", status.getStart_date());
            result.put("end_date", status.getStart_date());
            result.put("clockedIn", status.getStart_date() != null && status.getStart_date() == null);
            result.put("clockedOut", status.getStart_date() != null);
        } else {
            result.put("start_date", null);
            result.put("end_date", null);
            result.put("clockedIn", false);
            result.put("clockedOut", false);
        }
        return result;
    }
}