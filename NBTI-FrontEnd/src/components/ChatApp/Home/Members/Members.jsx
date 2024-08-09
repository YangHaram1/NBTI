import React, { useState, useEffect, useRef, useContext } from 'react';
import styles from './Members.module.css';
import axios from 'axios';
import Modal from './Modal/Modal';
import { useMemberStore } from '../../../../store/store';
import { useAuthStore } from './../../../../store/store';
import Profile from './Profile/Profile';
import { ChatsContext } from '../../../../Context/ChatsContext';
import { host } from '../../../../config/config';
import avatar from '../../../../images/user.jpg'

const Members = ({ setName }) => {
    const [list, setList] = useState([]);
    const [modalDisplay, setModalDisplay] = useState(null);
    const { members } = useMemberStore();
    const { loginID } = useAuthStore();
    const { dragRef } = useContext(ChatsContext);

    const [listDisplay, setListDisplay] = useState([]);
    const [teamDisplay, setTeamDisplay] = useState([[]]);
    const [mainDisplay, setMainDisplay] = useState(true);
    const [allMember, setAllmember] = useState(true);

    const modalRef = useRef([]);
    const profileRef = useRef([]);

    const handleRightClick = (index) => (e) => {
        const rect = dragRef.current.getBoundingClientRect(); //부모요소~ 드래그 되는애
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.preventDefault();
        setModalDisplay((prev) => {
            if (prev != null) {
                prev.style.display = 'none'
            }
            modalRef.current[index].style.display = 'flex';
            modalRef.current[index].style.top = y + 'px';
            modalRef.current[index].style.left = x + 'px';
            return modalRef.current[index];
        });
    };

    const handleClick = () => {
        setModalDisplay((prev) => {
            if (prev != null) {
                prev.style.display = 'none'
            }
            return null;
        })
    }
    /*
     {
                    list.filter((item) => {
                        if (item.id === loginID) {
                            return false;
                        }
                        return true;
                    }).map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                                <div onContextMenu={handleRightClick(index)} >
                                    {item.name}
                                </div>
                                <Profile profileRef={profileRef} index={index} item={item}></Profile>
                                <Modal modalRef={modalRef} index={index} item={item} profileRef={profileRef}></Modal>
                               
                            </React.Fragment>
                        );
                    })
                }
    
    
    */

    //데이터받기

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

    return (
        <div className={styles.container} onClick={handleClick}>
            <div className={styles.nbti} >
                <div onClick={handleMainDisplay} className={styles.button}>
                    {mainDisplay ? '➖' : '➕'}
                </div>
                <div className={styles.nbtiname} onClick={handleAll}>
                    NBTI
                </div>
            </div>
            {mainDisplay && (<div className={styles.menus}>
                {
                    list.map((dItem, dindex) => {
                        const teams = dItem.teams;
                        return (
                            <div className={styles.menu} key={dindex} >
                                <div className={styles.dept}>
                                    <div onClick={() => handlelistDisplay(dindex)} className={styles.button}>
                                        {listDisplay[dindex] ? '➖' : '➕'}
                                    </div>
                                    <div className={styles.deptname} onClick={() => handleDept(dindex)}>
                                        {dItem.dept}
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
                                                                {team.name} ({members.length})
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