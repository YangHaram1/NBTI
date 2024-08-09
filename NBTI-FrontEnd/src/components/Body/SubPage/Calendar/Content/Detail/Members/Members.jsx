import styles from './Members.module.css';
import avatar from '../../../../../../../images/user.jpg'
import React,{useState,useEffect} from 'react'
import { host } from '../../../../../../../config/config';
import axios from 'axios';
import { useMemberStore } from '../../../../../../../store/store';

const Members =()=>{
    const [list, setList] = useState([]);
    const [listDisplay, setListDisplay] = useState([]);
    const [teamDisplay, setTeamDisplay] = useState([[]]);
    const [mainDisplay, setMainDisplay] = useState(true);
    const [allMember, setAllmember] = useState(true);
    const { members } = useMemberStore();

    useEffect(() => {
        axios.get(`${host}/group`).then((resp) => {

            setList(resp.data);
            setListDisplay(() => {
                return (
                    resp.data.map((item, index) => {
                        return true;
                    })
                );
            })
            const initialDisplayState = resp.data.map(dept =>
                dept.teams.map(() => true
                )
            );
            setTeamDisplay(initialDisplayState);
        })
    }, [])



    const handlelistDisplay = (dindex) => { //부서 + -
        setListDisplay((prev) => {
            return (
                prev.map((item, index) => {
                    if (index === dindex)
                        return !item
                    return item;
                })
            )

        })
    }

    const handleTeamDisplay = (dindex, tindex) => { //팀 클릭하면 멤버 보여주게
        setTeamDisplay((prev) => {
            return (
                prev.map((dept, dIndex) =>
                    dept.map((team, tIndex) => {
                        if (dIndex === dindex && tIndex === tindex) {
                            return !team; //!item
                        }
                        return false;
                    })
                )
            )
        })
        setAllmember(false);
    }

    const handleMainDisplay = () => { //전체 + -
        setMainDisplay((prev) => {
            return !prev;
        })
    }

    const handleAll = () => { //전체보여주기 nbti 클릭

        const initialDisplayStateTrue = list.map(dept =>
            dept.teams.map(() => true
            )
        );
        setTeamDisplay(initialDisplayStateTrue);
        setAllmember(true);
    }
    const handleDept = (dindex) => { //부서클릭하면 부서보이게
        setTeamDisplay((prev) => {
            return (
                prev.map((dept, dIndex) =>
                    dept.map((team, tIndex) => {
                        if (dIndex === dindex) {
                            return true; //!item
                        }
                        return false;
                    })
                )
            )
        })
        setAllmember(true);
    }

    return(
        <div className={styles.container} >
        <div className={styles.nbti} >
            <div onClick={handleMainDisplay} className={styles.button}>
                {mainDisplay ? '➖' : '➕'}
            </div>
            <div className={styles.nbtiname} onClick={handleAll}>
                NBTI ({members.length})
            </div>
        </div>
        {mainDisplay && (<div className={styles.menus}>
            {
                list.map((dItem, dindex) => {
                    const teams = dItem.teams;
                    const totalMembers = teams.reduce((sum, team) => sum + team.members.length, 0);
                    return (
                        <div className={styles.menu} key={dindex} >
                            <div className={styles.dept}>
                                <div onClick={() => handlelistDisplay(dindex)} className={styles.button}>
                                    {listDisplay[dindex] ? '➖' : '➕'}
                                </div>
                                <div className={styles.deptname} onClick={() => handleDept(dindex)}>
                                    {dItem.dept}  ({totalMembers})
                                </div>
                            </div>
                            {listDisplay[dindex] && (
                                <div className={styles.teams}>
                                    {   
                                        teams.map((team, tindex) => {
                                            const members = team.members
                                           
                                            return (
                                                <React.Fragment key={tindex}>
                                                   
                                                        <div className={styles.team} onClick={() => handleTeamDisplay(dindex, tindex)} >
                                                            {team.name}  ({members.length})
                                                        </div>
                                                        {teamDisplay[dindex][tindex] && (<div className={styles.members}>
                                                           
                                                                {
                                                                    members.map((member, mindex) => {
                                
                                                                        return (
                                                                            (
                                                                                <React.Fragment key={mindex}  >
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
                                                                                        </div>
                                                                                    </div>
                                                                                </React.Fragment>
                                                                            )
                                                                        );

                                                                    })
                                                                }
                                                        
                                                        </div>)}
                                                </React.Fragment>
                                            );
                                        })
                                    }
                                </div>)}
                        </div>
                    );
                })
            }
        </div>)}
    </div>
    );
}
export default Members;