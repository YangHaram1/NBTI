import styles from "./Side.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { host } from "../../../../../config/config";
import { useMemberStore } from "../../../../../store/store";
const Side = ({ list, setList, listDisplay, setListDisplay, teamDisplay, setTeamDisplay, mainDisplay, setMainDisplay }) => {
    const [allMember, setAllmember] = useState(true);
    const { members } = useMemberStore();

    //let top = 100;
    useEffect(() => {
        // 외부 스타일시트를 동적으로 추가
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href =
            "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css";
        document.head.appendChild(link);

        // 컴포넌트가 언마운트될 때 스타일시트를 제거
        return () => {
            document.head.removeChild(link);
        };
    }, []);

    //데이터받기

    useEffect(() => {
        axios.get(`${host}/group`).then((resp) => {
            console.log(resp.data);
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

    useEffect(() => {
        console.log(teamDisplay);
    }, [teamDisplay])

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
                            return true; //!item
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
    return (
        <React.Fragment>
            <div className={styles.container}>
                <div className={styles.nbti} >
                    <div onClick={handleMainDisplay} className={styles.button}>
                        {mainDisplay ? 
                            <i class="fa-solid fa-angle-down"></i>
                            : 
                            <i className="fa-solid fa-angle-up"></i>
                        }
                    </div>
                    <div className={styles.nbtiname} onClick={handleAll}>
                        NBTI ({members.length})
                    </div>
                </div>
                {mainDisplay && (<div className={styles.menus}>
                    {
                        list.map((dItem, dindex) => {
                            const teams = dItem.teams;
                            const totalMembersTeam = teams.reduce((sum, team) => sum + team.members.length, 0);
                            return (
                                <div className={styles.menu} key={dindex} >
                                    <div className={styles.dept}>
                                        <div onClick={() => handlelistDisplay(dindex)} className={styles.button}>
                                            {listDisplay[dindex] ? 
                                                <i class="fa-solid fa-angle-down"></i>
                                                : 
                                                <i className="fa-solid fa-angle-up"></i>
                                            }
                                        </div>
                                        <div className={styles.deptname} onClick={() => handleDept(dindex)}>
                                            {dItem.dept}  ({totalMembersTeam})
                                        </div>
                                    </div>
                                    {listDisplay[dindex] && (
                                        <div className={styles.teams}>
                                            {
                                                teams.map((team, tindex) => {
                                                    const members = team.members

                                                    return (
                                                        <React.Fragment key={tindex}>
                                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                                <div className={styles.team} onClick={() => handleTeamDisplay(dindex, tindex)} >
                                                                    {team.name} ({members.length})
                                                                </div>
                                                                {/* {teamDisplay[dindex][tindex] && (<div className={allMember ? styles.members : styles.membersTop} style={{ top: allMember ? `${(top++ % 100) * 150 + top}px` : '0px' }}>
                                                                    {members.length > 0 && (<div>
                                                                        {team.name}
                                                                    </div>)}
                                                                    <div style={{ display: "flex" }}>
                                                                        {
                                                                            // members.map((member, mindex) => {
                                                                            //     return (
                                                                            //         <React.Fragment key={mindex}  >
                                                                            //             <Content member={member} name={team.name}></Content>
                                                                            //         </React.Fragment>
                                                                            //     );
                                                                            // })
                                                                        }
                                                                    </div>
                                                                </div>)} */}
                                                            </div>
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
        </React.Fragment>
    );
};
export default Side;