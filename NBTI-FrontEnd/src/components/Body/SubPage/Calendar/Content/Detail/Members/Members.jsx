import styles from './Members.module.css';
import avatar from '../../../../../../../images/user.jpg';
import React, { useState, useEffect } from 'react';
import { host } from '../../../../../../../config/config';
import axios from 'axios';
import { useMemberStore } from '../../../../../../../store/store';

const Members = ( {membersList, setMembersList} ) => {
    const [list, setList] = useState([]);
    const { members } = useMemberStore();


    useEffect(() => {
        axios.get(`${host}/group`).then((resp) => {
            setList(resp.data);
        });
    }, []);


    // 체크박스 상태 변경 핸들러
    const handleCheckboxChange = (member) => {
        // console.log(member)
        // 이미 체크된 멤버인지 확인
        const isChecked = membersList.some(item => item.id === member.id);
        
        if (isChecked) {
            // 체크 해제 시 membersList에서 해당 멤버 제거
            setMembersList(membersList.filter(item => item.id !== member.id));
        } else {
            // 체크 시 membersList에 해당 멤버 추가
            setMembersList([...membersList, member]);
        }
        // console.log(membersList)
    };

    return (
        <div className={styles.container}>
            <div className={styles.nbti}>
                <div className={styles.nbtiname}>
                    NBTI ({members.length})
                </div>
            </div>
            <div className={styles.menus}>
                {list.map((dItem, dindex) => {
                    const teams = dItem.teams;
                    const totalMembers = teams.reduce((sum, team) => sum + team.members.length, 0);
                    return (
                        <div className={styles.menu} key={dindex}>
                            <div className={styles.dept}>
                                <div className={styles.deptname}>
                                    {dItem.dept} ({totalMembers})
                                </div>
                            </div>
                            <div className={styles.teams}>
                                {teams.map((team, tindex) => {
                                    const members = team.members;
                                    return (
                                        <React.Fragment key={tindex}>
                                            <div className={styles.team}>
                                                {team.name} ({members.length})
                                            </div>
                                            <div className={styles.members}>
                                                {members.map((member, mindex) => {
                                                    return (
                                                        <React.Fragment key={mindex}>
                                                            <div className={styles.member}>
                                                                <div className={styles.div1}>
                                                                    <img src={(member.member_img === null) ? `${avatar}` : `${host}/images/avatar/${member.id}/${member.member_img}`} alt="" />
                                                                </div>
                                                                <div className={styles.div2}>
                                                                    <div>
                                                                        {member.name}
                                                                    </div>
                                                                    <div>
                                                                        {member.job_name}
                                                                    </div>
                                                                </div>                                                    <input 
                                                                    type="checkbox" 
                                                                    checked={membersList.some(item => item.id === member.id)} // 체크 상태 가져오기
                                                                    onChange={() => handleCheckboxChange(member)} // 상태 변경 핸들러 연결
                                                                />
                                                            </div>
                                                        </React.Fragment>
                                                    );
                                                })}
                                            </div>
                                        </React.Fragment>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Members;
