import React from 'react';
import styles from './Team.module.css'; // CSS 모듈 import

const Team = ({ teams, selectedTeam, onTeamChange }) => {
    return (
        <div className={styles.selectContainer}>
            <select
                name="team"
                value={selectedTeam}
                onChange={onTeamChange}
                className={styles.teamSelect} // 스타일 적용
            >
                <option value="">팀 선택</option>
                {teams.map(team => (
                    <option key={team.team_code} value={team.team_code}>
                        {team.team_name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Team;
