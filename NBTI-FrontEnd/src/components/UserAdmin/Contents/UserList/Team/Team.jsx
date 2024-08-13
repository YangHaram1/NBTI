import React from 'react';
import styles from './Team.module.css'; // CSS 모듈 import

const Team = ({ teams, selectedTeam, onTeamChange }) => {
    return (
        <div className={styles.selectContainer}>
<select
    name="team"
    value={selectedTeam}
    onChange={onTeamChange}
    className={styles.teamSelect}
>
    <option value="">팀 선택</option>
    {teams.map((team) => {
        console.log('Rendering Option:', team.team_code, team.team_name); // 팀 코드와 이름을 로그로 확인
        return (
            <option key={team.team_code} value={team.team_code}>
                {team.team_name}
            </option>
        );
    })}
</select>

        </div>
    );
};

export default Team;
