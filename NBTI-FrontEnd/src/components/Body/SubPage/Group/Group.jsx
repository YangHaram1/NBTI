import styles from './Group.module.css';
import  Side  from './Side/Side';
import Content from './Content/Content' 
import { useState,useEffect } from 'react';
import { host } from '../../../../config/config';
import axios from "axios";
const Group=()=>{
    const [list, setList] = useState([]);
    const [listDisplay, setListDisplay] = useState([]);
    const [teamDisplay, setTeamDisplay] = useState([[]]);
    const [mainDisplay, setMainDisplay] = useState(true);

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




    return(
        <div className={styles.container}>
            <Side  list={list}  listDisplay={listDisplay} teamDisplay={teamDisplay} mainDisplay={mainDisplay} setList={setList} setListDisplay={setListDisplay} setTeamDisplay={setTeamDisplay} setMainDisplay={setMainDisplay}></Side>
            <Content list={list}  listDisplay={listDisplay} teamDisplay={teamDisplay} mainDisplay={mainDisplay} ></Content>
        </div>
    );
}
export default Group;