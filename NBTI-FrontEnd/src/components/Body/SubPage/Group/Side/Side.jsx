import styles from "./Side.module.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Content from "../Content/Content";
import axios from "axios";
import { host } from "../../../../../config/config";
const Side = () => {
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

    const [list, setList] = useState([]);
    useEffect(() => {
        axios.get(`${host}/group`).then((resp) => {
            console.log(resp.data);
            setList(resp.data);
        })
    }, [])

    const navi = useNavigate();

    return (
        <React.Fragment>
            <div className={styles.container}>
                <div className={styles.menus}>
                    {
                        list.map((dItem, dindex) => {
                            const teams = dItem.teams;
                            return (
                                <div className={styles.menu}>
                                    {dItem.dept}
                                    <div className={styles.dept} key={dindex}>
                                        {
                                            teams.map((team, tindex) => {
                                                return (
                                                    <div className={styles.team}>
                                                        {team.name}
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            );
                        })

                    }
                </div>
            </div>
            <Content></Content>
        </React.Fragment>
    );
};
export default Side;