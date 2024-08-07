import styles from "./Side.module.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Content from "../Content/Content";
import axios from "axios";
import { host } from "../../../../../config/config";
const Side = () => {
    const [list, setList] = useState([]);
    const [listDisplay, setListDisplay] = useState([]);
    const [teamDisplay, setTeamDisplay] = useState([[]]);
    const [mainDisplay, setMainDisplay] = useState(true);
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
                dept.teams.map(() => false
                )
            );
            setTeamDisplay(initialDisplayState);
        })
    }, [])

    useEffect(() => {
        console.log(teamDisplay);
    }, [teamDisplay])

    const handlelistDisplay = (dindex) => {
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

    const handleTeamDisplay = (dindex, tindex) => {
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
    }

    const handleMainDisplay = () => {
        setMainDisplay((prev) => {
            return !prev;
        })
    }
    return (
        <React.Fragment>
            <div className={styles.container}>
                <div className={styles.nbti} >
                    <div onClick={handleMainDisplay} className={styles.button}>
                        {mainDisplay ? '➖' : '➕'}
                    </div>
                    <div className={styles.nbtiname}>
                        nbti
                    </div>
                </div>
                {mainDisplay && (<div className={styles.menus}>
                    {
                        list.map((dItem, dindex) => {
                            const teams = dItem.teams;
                            return (
                                <div className={styles.menu} key={dindex} >
                                    <div  className={styles.dept}>
                                        <div onClick={() => handlelistDisplay(dindex)} className={styles.button}>
                                            {listDisplay[dindex] ? '➖' : '➕'}
                                        </div>
                                        <div className={styles.deptname}>
                                            {dItem.dept}
                                        </div>
                                    </div>
                                    {listDisplay[dindex] && (
                                        <div className={styles.teams}>
                                            {
                                                teams.map((team, tindex) => {
                                                    const members = team.members

                                                    let top = 100;
                                                    return (
                                                        <React.Fragment key={tindex}>
                                                            <div className={styles.team} onClick={() => handleTeamDisplay(dindex, tindex)} >
                                                                {team.name} ({members.length})
                                                            </div>
                                                            <div className={styles.members}>
                                                                {
                                                                    members.map((member, mindex) => {
                                                                        return (
                                                                            teamDisplay[dindex][tindex] &&
                                                                            (
                                                                                <React.Fragment key={mindex}>
                                                                                    <Content member={member} top={top++} name={team.name}></Content>
                                                                                </React.Fragment>
                                                                            )
                                                                        );

                                                                    })
                                                                }
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