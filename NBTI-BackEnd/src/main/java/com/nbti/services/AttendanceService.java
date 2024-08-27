package com.nbti.services;

import java.sql.Timestamp;
import java.time.DayOfWeek;
import java.time.Duration;
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
import com.nbti.dao.MembersDAO;
import com.nbti.dto.AttendanceDTO;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceDAO aDao;
    @Autowired
    private MembersDAO mDao;

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
            }
        } else {
            // Handle case where no current record is found
            LocalDateTime currentDateTime = endDate.toLocalDateTime();
            if (currentDateTime.toLocalTime().isAfter(LocalTime.of(18, 0))) {
                // Mark as absent if no clock-in by 18:00
                markAbsent(memberId);
            }
        }
    }

    private void markAbsent(String memberId) {
        // Logic to handle absenteeism
        System.out.println("Member ID " + memberId + " is marked as absent.");
        // Additional logic to handle absence (e.g., notify HR, update records, etc.)
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

    public Map<String, Object> getYearlyStats(String memberId) {
        List<AttendanceDTO> records = aDao.getYearlyRecords(memberId);

        LocalDate today = LocalDate.now();
        LocalDate startOfYear = today.with(TemporalAdjusters.firstDayOfYear());
        LocalDate endOfYear = today.with(TemporalAdjusters.lastDayOfYear());

        int lateCount = 0;
        int absentCount = 0;
        int earlyLeaveCount = 0;
        int statsDay = 0;
        double statsHours = 0.0;
        
        // Track attendance dates
        Map<LocalDate, Boolean> attendanceMap = new HashMap<>();

        for (AttendanceDTO record : records) {
            Timestamp startDate = record.getStart_date();
            Timestamp endDate = record.getEnd_date();
            
            if (startDate != null) {
                LocalDateTime startDateTime = startDate.toLocalDateTime();
                LocalDate localDate = startDateTime.toLocalDate();

                if (!startDateTime.toLocalDate().isBefore(startOfYear) &&
                    !startDateTime.toLocalDate().isAfter(endOfYear)) {

                    // Mark attendance
                    attendanceMap.put(localDate, true);

                    // 지각 체크
                    if (startDateTime.toLocalTime().isAfter(LocalTime.of(9, 0))) {
                        lateCount++;
                    }

                    // 조기 퇴근 체크
                    if (endDate != null) {
                        LocalDateTime endDateTime = endDate.toLocalDateTime();
                        if (endDateTime.toLocalTime().isBefore(LocalTime.of(18, 0))) {
                            earlyLeaveCount++;
                        }
                        
                        // 근무 시간 계산
                        Duration workDuration = Duration.between(startDateTime, endDateTime);
                        statsHours += workDuration.toHours() + workDuration.toMinutesPart() / 60.0;
                        statsDay++;
                    }
                }
            }
        }

        // Calculate absences
        for (LocalDate date = startOfYear; !date.isAfter(today.minusDays(1)); date = date.plusDays(1)) {
            if (!attendanceMap.containsKey(date)) {
                absentCount++;
            }
        }

        Map<String, Object> result = new HashMap<>();
        result.put("lateCount", lateCount);
        result.put("absentCount", absentCount);
        result.put("earlyLeaveCount", earlyLeaveCount);
        result.put("statsDay", statsDay);
        result.put("statsHours", statsHours);

        return result;
    }

    public Map<String, Object> getMonthlyStats(String memberId, int year, int month) {
        List<AttendanceDTO> records = aDao.getMonthlyRecords(memberId, year, month);

        LocalDate startOfMonth = LocalDate.of(year, month, 1);
        LocalDate endOfMonth = startOfMonth.with(TemporalAdjusters.lastDayOfMonth());
        LocalDate today = LocalDate.now();

        int lateCount = 0;
        int absentCount = 0;
        int earlyLeaveCount = 0;
        double totalWorkHours = 0;

        // Track attendance dates
        Map<LocalDate, Boolean> attendanceMap = new HashMap<>();

        for (AttendanceDTO record : records) {
            Timestamp startDate = record.getStart_date();
            Timestamp endDate = record.getEnd_date();

            if (startDate != null) {
                LocalDateTime startDateTime = startDate.toLocalDateTime();
                LocalDate localDate = startDateTime.toLocalDate();
                String dateString = localDate.toString();

                if (!attendanceMap.containsKey(localDate)) {
                    attendanceMap.put(localDate, true);
                }

                if (!localDate.isBefore(startOfMonth) && !localDate.isAfter(endOfMonth)) {
                    if (startDateTime.toLocalTime().isAfter(LocalTime.of(9, 0))) {
                        lateCount++;
                    }

                    if (endDate != null) {
                        LocalDateTime endDateTime = endDate.toLocalDateTime();
                        Duration workDuration = Duration.between(startDateTime, endDateTime);
                        totalWorkHours += workDuration.toHours() + workDuration.toMinutes() / 60.0;

                        if (endDateTime.toLocalTime().isBefore(LocalTime.of(18, 0))) {
                            earlyLeaveCount++;
                        }
                    }
                }
            }
        }

        // Calculate absences
        for (LocalDate date = startOfMonth; !date.isAfter(today.minusDays(1)); date = date.plusDays(1)) {
            if (!attendanceMap.containsKey(date)) {
                absentCount++;
            }
        }

        Map<String, Object> result = new HashMap<>();
        result.put("lateCount", lateCount);
        result.put("absentCount", absentCount);
        result.put("earlyLeaveCount", earlyLeaveCount);
        result.put("totalWorkHours", totalWorkHours);
        result.put("dailyStats", attendanceMap);

        return result;
    }

    public Map<String, Object> getWeeklyStats(String memberId) {
        List<AttendanceDTO> records = aDao.getWeeklyRecords(memberId);

        LocalDate today = LocalDate.now();
        LocalDate startOfWeek = today.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        LocalDate endOfWeek = startOfWeek.plusDays(6);

        int lateCount = 0;
        int absentCount = 0;
        int earlyLeaveCount = 0;

        // Track attendance dates
        Map<LocalDate, Boolean> attendanceMap = new HashMap<>();

        for (AttendanceDTO record : records) {
            Timestamp startDate = record.getStart_date();
            Timestamp endDate = record.getEnd_date();

            if (startDate != null) {
                LocalDateTime startDateTime = startDate.toLocalDateTime();
                LocalDate localDate = startDateTime.toLocalDate();
                String dateString = localDate.toString();

                if (!attendanceMap.containsKey(localDate)) {
                    attendanceMap.put(localDate, true);
                }

                if (startDateTime.toLocalDate().isAfter(startOfWeek.minusDays(1)) && startDateTime.toLocalDate().isBefore(endOfWeek.plusDays(1))) {
                    if (startDateTime.toLocalTime().isAfter(LocalTime.of(9, 0))) {
                        lateCount++;
                    }

                    if (endDate != null) {
                        LocalDateTime endDateTime = endDate.toLocalDateTime();
                        if (endDateTime.toLocalTime().isBefore(LocalTime.of(18, 0))) {
                            earlyLeaveCount++;
                        }
                    }
                }
            }
        }

        // Calculate absences
        for (LocalDate date = startOfWeek; !date.isAfter(today.minusDays(1)); date = date.plusDays(1)) {
            if (!attendanceMap.containsKey(date)) {
                absentCount++;
            }
        }

        Map<String, Object> result = new HashMap<>();
        result.put("lateCount", lateCount);
        result.put("absentCount", absentCount);
        result.put("earlyLeaveCount", earlyLeaveCount);
        result.put("dailyStats", attendanceMap);

        return result;
    }

    public List<AttendanceDTO> getWeeklyRecordsForAll(LocalDate startOfWeek, LocalDate endOfWeek) {
        return aDao.getWeeklyRecordsForAll(startOfWeek, endOfWeek);
    }

    public Map<String, Map<String, Object>> calculateAllWeeklyStats(List<AttendanceDTO> attendanceRecords) {
        LocalDate today = LocalDate.now();
        LocalDate startOfWeek = today.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        LocalDate endOfWeek = startOfWeek.plusDays(6);

        Map<String, Map<String, Object>> allStats = new HashMap<>();

        for (AttendanceDTO record : attendanceRecords) {
            String memberId = record.getMember_id();
            if (!allStats.containsKey(memberId)) {
                allStats.put(memberId, new HashMap<>());
            }

            Map<String, Object> stats = allStats.get(memberId);
            Timestamp startDate = record.getStart_date();
            Timestamp endDate = record.getEnd_date();

            if (startDate != null) {
                LocalDateTime startDateTime = startDate.toLocalDateTime();
                LocalDate localDate = startDateTime.toLocalDate();
                if (localDate.isEqual(today) && endDate == null) {
                    int absentCount = (int) stats.getOrDefault("absentCount", 0);
                    absentCount++;
                    stats.put("absentCount", absentCount);
                }

                if (startDateTime.toLocalDate().isAfter(startOfWeek.minusDays(1)) && startDateTime.toLocalDate().isBefore(endOfWeek.plusDays(1))) {
                    int lateCount = (int) stats.getOrDefault("lateCount", 0);
                    int earlyLeaveCount = (int) stats.getOrDefault("earlyLeaveCount", 0);

                    if (startDateTime.toLocalTime().isAfter(LocalTime.of(9, 0))) {
                        lateCount++;
                        stats.put("lateCount", lateCount);
                    }

                    if (endDate != null) {
                        LocalDateTime endDateTime = endDate.toLocalDateTime();
                        if (endDateTime.toLocalTime().isBefore(LocalTime.of(18, 0))) {
                            earlyLeaveCount++;
                            stats.put("earlyLeaveCount", earlyLeaveCount);
                        }
                    }
                }
            }
        }

        return allStats;
    }
}
