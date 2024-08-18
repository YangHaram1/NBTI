import styles from './Content.module.css';
import { host } from '../../../../../config/config';
import avatar from '../../../../../images/user.jpg'
import React from "react";

const Content = ({list ,listDisplay,teamDisplay,mainDisplay}) => {
    return (
        <React.Fragment>
            <div className={styles.container}>
                {mainDisplay && (<div className={styles.menus}>
                    {
                        list.map((dItem, dindex) => {
                            const teams = dItem.teams;
                            return (
                                <div className={styles.menu} key={dindex} >

                                    {listDisplay[dindex] && (
                                        <div className={styles.teams}>
                                            {
                                                teams.map((team, tindex) => {
                                                    const members = team.members
                                                    return (
                                                        <React.Fragment key={tindex}>
                                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                                {teamDisplay[dindex][tindex] && (<div className={styles.members}>
                                                                    {members.length > 0 && (
                                                                        <div>
                                                                            {team.name}
                                                                        </div>
                                                                    )
                                                                    }
                                                                    <div className={styles.mContainer}>
                                                                        {
                                                                            members.slice(0, 5).map((member, mindex) => {
                                                                                return (
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
                                                                                );

                                                                            })
                                                                        }
                                                                    </div>
                                                                    <div className={styles.mContainer}>
                                                                        {
                                                                            members.slice(5).map((member, mindex) => {
                                                                                return (
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
                                                                                );

                                                                            })
                                                                        }
                                                                    </div>
                                                                </div>)}
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


}
export default Content;