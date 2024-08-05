package com.nbti.services;

import java.sql.Timestamp;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.TemporalAdjusters;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nbti.dao.AttendanceDAO;
import com.nbti.dto.AttendanceDTO;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceDAO aDao;

    public Map<String, Object> clockIn(String memberId) {
        Timestamp now = new Timestamp(System.currentTimeMillis());
        Timestamp clockInDeadline = Timestamp.valueOf(LocalDateTime.now().toLocalDate().atTime(9, 0));
        boolean isLate = now.after(clockInDeadline);

        AttendanceDTO dto = new AttendanceDTO();
        dto.setMember_id(memberId);
        dto.setStart_date(now);
        aDao.insert(dto);

        Map<String, Object> result = new HashMap<>();
        result.put("seq", dto.getSeq());
        result.put("start_date", dto.getStart_date());
        result.put("isLate", isLate);

        return result;
    }

    public void clockOut(String memberId, Timestamp endDate) {
        AttendanceDTO currentRecord = aDao.getCurrentStatus(memberId);
        if (currentRecord != null) {
            Timestamp startDate = currentRecord.getStart_date();
            LocalDateTime startDateTime = startDate.toLocalDateTime();
            LocalDateTime endDateTime = endDate.toLocalDateTime();

            // Update end date
            aDao.updateClockOut(currentRecord.getSeq(), endDate);

            // Check for early leave
            if (endDateTime.toLocalTime().isBefore(LocalTime.of(18, 0))) {
                // Handle early leave logic
                System.out.println("조기 퇴근 처리: " + memberId);
            }
        } else {
            // Handle case where no current record is found
            System.out.println("퇴근 기록이 없습니다: " + memberId);
        }
    }

    public Map<String, Object> getStatus(String memberId) {
        AttendanceDTO status = aDao.getCurrentStatus(memberId);
        Map<String, Object> result = new HashMap<>();
        if (status != null) {
            result.put("start_date", status.getStart_date());
            result.put("end_date", status.getEnd_date());
            result.put("clockedIn", status.getStart_date() != null);
            result.put("clockedOut", status.getEnd_date() != null);
            if (status.getStart_date() != null) {
                boolean isLate = status.getStart_date().toLocalDateTime().toLocalTime().isAfter(LocalTime.of(9, 0));
                result.put("isLate", isLate);
            } else {
                result.put("isLate", false);
            }
        } else {
            result.put("start_date", null);
            result.put("end_date", null);
            result.put("clockedIn", false);
            result.put("clockedOut", false);
            result.put("isLate", false);
        }
        return result;
    }

    public Map<String, Integer> getWeeklyStats(String memberId) {
        List<AttendanceDTO> records = aDao.getWeeklyRecords(memberId);

        // Determine start and end of the current week
        LocalDate today = LocalDate.now();
        LocalDate startOfWeek = today.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        LocalDate endOfWeek = startOfWeek.plusDays(6);

        int lateCount = 0;
        int absentCount = 0;
        int earlyLeaveCount = 0;

        for (AttendanceDTO record : records) {
            Timestamp startDate = record.getStart_date();
            Timestamp endDate = record.getEnd_date();

            if (startDate != null) {
                LocalDateTime startDateTime = startDate.toLocalDateTime();
                if (startDateTime.toLocalDate().isAfter(startOfWeek.minusDays(1)) && startDateTime.toLocalDate().isBefore(endOfWeek.plusDays(1))) {
                    // Check for lateness
                    if (startDateTime.toLocalTime().isAfter(LocalTime.of(9, 0))) {
                        lateCount++;
                    }

                    // Check for early leave
                    if (endDate != null) {
                        LocalDateTime endDateTime = endDate.toLocalDateTime();
                        if (endDateTime.toLocalTime().isBefore(LocalTime.of(18, 0))) {
                            earlyLeaveCount++;
                        }
                    } else {
                        // Handle absenteeism
                        if (startDateTime.toLocalDate().isEqual(today)) {
                            absentCount++;
                        }
                    }
                }
            }
        }

        Map<String, Integer> result = new HashMap<>();
        result.put("lateCount", lateCount);
        result.put("absentCount", absentCount);
        result.put("earlyLeaveCount", earlyLeaveCount);

        return result;
    }
}
