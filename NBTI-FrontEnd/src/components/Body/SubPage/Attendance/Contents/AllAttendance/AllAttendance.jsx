import React, { useState, useCallback, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko';
import useAllWeeklyStats from './useAllAttendance';
import styles from './AllAttendance.module.css';
import SearchUser from './SearchUser/SearchUser';
import ReactPaginate from 'react-paginate';

const formatTime = (date) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleTimeString('ko-KR', options);
};

const formatDate = (date) => new Date(date).toISOString().split('T')[0];

const getDayOfWeek = (date) => (date.getDay() + 6) % 7;

const getStartOfWeek = (date) => {
    const day = date.getDay();
    const monday = new Date(date);
    monday.setDate(date.getDate() - (day === 0 ? 6 : day - 2));
    return monday;
};

const calculateWorkingHours = (startDate, endDate) => {
    if (!startDate || !endDate) return 'N/A';
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffMs = end - start;
    if (diffMs < 0) return 'N/A';
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${diffHours}시간 ${diffMinutes}분`;
};

export const AllAttendance = () => {
    const { stats, loading } = useAllWeeklyStats();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [currentPageMembers, setCurrentPageMembers] = useState([]);
    const [currentWeekStart, setCurrentWeekStart] = useState(getStartOfWeek(new Date()));
    const calendarRef = useRef(null);
    const [cpage, setCpage] = useState(0);
    const [page_total_count, setPage_total_count] = useState(1);

    const record_count_per_page = 10;
    

    const handleList = useCallback(() => {
        const startOfWeek = getStartOfWeek(currentWeekStart);

        const membersToDisplay = filteredMembers.length > 0 ? filteredMembers : Object.keys(stats).map(memberId => {
            const memberStats = stats[memberId] || {};
            const hasAttendance = Object.keys(memberStats).length > 0;
            return {
                memberId,
                name: hasAttendance ? memberStats[Object.keys(memberStats)[0]].name : 'N/A',
                teamName: hasAttendance ? memberStats[Object.keys(memberStats)[0]].team_name : 'N/A'
            };
        });

        // 페이지당 10명씩 표시
        const totalMembers = membersToDisplay.length;
        setPage_total_count(Math.ceil(totalMembers / record_count_per_page));

        const paginatedMembers = membersToDisplay.slice(cpage * record_count_per_page, (cpage + 1) * record_count_per_page);
        setCurrentPageMembers(paginatedMembers);
    }, [filteredMembers, stats, currentWeekStart, cpage]);

    useEffect(() => {
        handleList();
    }, [handleList]);

    const handlePage = (data) => {
        setCpage(data.selected);
    };

    const handleSearch = useCallback(() => {
        if (searchTerm.trim() === '') {
            const allMembers = Object.keys(stats).map(memberId => {
                const memberStats = stats[memberId] || {};
                const hasAttendance = Object.keys(memberStats).length > 0;
                return {
                    memberId,
                    name: hasAttendance ? memberStats[Object.keys(memberStats)[0]].name : 'N/A',
                    teamName: hasAttendance ? memberStats[Object.keys(memberStats)[0]].team_name : 'N/A'
                };
            });
            setFilteredMembers(allMembers);
        } else {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            const filtered = Object.keys(stats).map(memberId => {
                const memberStats = stats[memberId] || {};
                const hasAttendance = Object.keys(memberStats).length > 0;
                const name = hasAttendance ? memberStats[Object.keys(memberStats)[0]].name : 'N/A';
                const teamName = hasAttendance ? memberStats[Object.keys(memberStats)[0]].team_name : 'N/A';
                return { memberId, name, teamName };
            }).filter(({ name }) => name.toLowerCase().includes(lowerCaseSearchTerm));

            setFilteredMembers(filtered);
        }
        setCpage(0);
    }, [searchTerm, stats]);

    useEffect(() => {
        handleSearch();
    }, [searchTerm, stats, handleSearch]);

    const handleDatesSet = (info) => {
        const startOfWeek = getStartOfWeek(info.view.currentStart);
        if (startOfWeek.getTime() !== currentWeekStart.getTime()) {
            setCurrentWeekStart(startOfWeek);
        }
    };

    const handlePrevWeek = () => {
        setCurrentWeekStart(prev => {
            const startOfWeek = new Date(prev);
            startOfWeek.setDate(startOfWeek.getDate() - 7);
            return getStartOfWeek(startOfWeek);
        });
    };

    const handleNextWeek = () => {
        setCurrentWeekStart(prev => {
            const startOfWeek = new Date(prev);
            startOfWeek.setDate(startOfWeek.getDate() + 7);
            return getStartOfWeek(startOfWeek);
        });
    };

    const handleTodayClick = () => {
        const today = new Date();
        setCurrentWeekStart(getStartOfWeek(today));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <SearchUser
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onSearch={handleSearch}
            />
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridWeek"
                locales={[koLocale]}
                locale="ko"
                selectable={true}
                height="auto"
                events={currentPageMembers.flatMap(({ memberId, name, teamName }) => {
                    const startOfWeek = getStartOfWeek(currentWeekStart);
                    return Array.from({ length: 7 }).map((_, index) => {
                        const date = new Date(startOfWeek);
                        date.setDate(date.getDate() + index);
                        const formattedDate = formatDate(date);

                        const { startDate, endDate } = stats[memberId]?.[formattedDate] || {};

                        const startTime = startDate ? formatTime(startDate) : 'N/A';
                        const endTime = endDate ? formatTime(endDate) : 'N/A';
                        const workingHours = calculateWorkingHours(startDate, endDate);

                        const title = `출근: ${startTime}\n퇴근: ${endTime}\n근무 시간: ${workingHours}\n`;

                        let backgroundColor = 'white';
                        let textColor = 'black';

                        if (!startDate && !endDate) {
                            backgroundColor = 'gray';
                            textColor = 'white';
                        }

                        return {
                            title,
                            start: formattedDate,
                            extendedProps: {
                                backgroundColor,
                                textColor,
                                dayOfWeek: getDayOfWeek(date),
                                memberName: name,
                                teamName
                            }
                        };
                    });
                })}
                firstDay={1}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: ''
                }}
                datesSet={handleDatesSet}
                eventContent={({ event }) => {
                    const lines = event.title.split('\n');
                    return (
                        <div
                            className={styles.eventContent}
                            style={{ backgroundColor: event.extendedProps.backgroundColor, color: event.extendedProps.textColor }}
                        >
                            <div style={{ display: "flex", flexDirection: "column", alignItems: 'flex-start' }}>
                                <div>이름: {event.extendedProps.memberName}</div>
                                <div>부서: {event.extendedProps.teamName}</div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", textAlign: "center", flex: 1 }}>
                                {lines.map((line, index) => (
                                    <div key={index}>{line}</div>
                                ))}
                            </div>
                        </div>
                    );
                }}
            />
            <ReactPaginate
                pageCount={page_total_count}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                onPageChange={handlePage}
                containerClassName={styles.pagination}
                activeClassName={styles.active}
                initialPage={cpage}
                previousLabel={'<'}
                previousClassName={styles.previous}
                nextLabel={'>'}
                nextClassName={styles.next}
                breakLabel={'...'}
                breakClassName={null}
            />
        </div>
    );
};
