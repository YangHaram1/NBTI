import { useEffect, useState } from 'react';
import styles from './ApprovalTree.module.css';
import axios from 'axios';
import { host } from '../../../../../../../config/config';
import { SecondTreeNode } from '../SecondTreeNode/SecondTreeNode';

export const ApprovalTree =()=>{
    
    const [deptType, setDeptType] = useState([]);
    const [teamType, setTeamType] = useState([]);
    const [members, setMembers] = useState([]);

    useEffect(()=>{
        axios.get(`${host}/members/selectDepartment`)
        .then((dept)=>{
            setDeptType(dept.data);
            console.log(dept.data);
            axios.get(`${host}/members/selectTeam`)
            .then((team)=>{
                setTeamType(team.data);
                console.log(team.data);
                axios.get(`${host}/members/selectAll`)
                .then((member)=>{
                    setMembers(member.data);
                    console.log(member.data);
                })
            })
        })

    },[])

    const buildTree = ()=>{
        const deptMap = new Map();

        deptType.forEach((dept)=>{
            deptMap.set(dept.dept_code,{
                id:dept.dept_code,
                name : dept.dept_name,
                children:[]
            });
        });

        teamType.forEach((team)=>{
            if(deptMap.has(team.dept_code)){
                deptMap.get(team.dept_code).children.push({
                    id:team.team_code,
                    name : team.team_name,
                    children:[]
                });
            }
        });

        // members.forEach((member)=>{
        //     if(deptMap.has(member.team_code)){
        //         deptMap.get(member.team_code).children.push({
        //             id:member.id,
        //             name :member.name,
        //             team_code: member.team_code
        //         });
        //     }
        // });

        members.forEach((member) => {
            teamType.forEach((team) => {
                if (team.team_code === member.team_code) {
                    const dept = deptMap.get(team.dept_code);
                    if (dept) {
                        const team = dept.children.find(t => t.id === member.team_code);
                        if (team) {
                            team.children.push({
                                id: member.id,
                                name: member.name
                            });
                        }
                    }
                }
            });
        });

        return Array.from(deptMap.values());

    }

    const tree = buildTree();

    return(
        <div className={styles.tree_container}>
            <ul className={styles.tree}>
                {tree.map((node) => (
                    <SecondTreeNode key={node.id} node={node} />
                ))}
            </ul>
        </div>
    );

}