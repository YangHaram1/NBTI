package com.nbti.dao;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nbti.dto.AttendanceDTO;

@Repository
public class AttendanceDAO {

    @Autowired
    private SqlSession mybatis;

    public AttendanceDTO insert(AttendanceDTO dto) {
        mybatis.insert("Attendance.insert", dto);
        return dto; // DTO 객체에는 삽입 후 자동 생성된 seq 값이 포함되어 있음
    }

    public void updateClockOut(int seq, Timestamp endDate) {
        Map<String, Object> params = new HashMap<>();
        params.put("seq", seq);
        params.put("end_date", endDate); // Map의 키가 매퍼의 파라미터 이름과 일치해야 함
        mybatis.update("Attendance.updateClockOut", params);
    }

    public void markAsAbsent(int seq) {
        Map<String, Object> params = new HashMap<>();
        params.put("seq", seq);
        mybatis.update("Attendance.markAsAbsent", params);
    }

    public AttendanceDTO getCurrentStatus(String memberId) {
        return mybatis.selectOne("Attendance.getCurrentStatus", memberId);
    }
}
