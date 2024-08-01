import styles from './ApprovalLine.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { host } from '../../../../../../../config/config';
import { useApprovalLine, useReferLine } from '../../../../../../../store/store';

export const ApprovalLine = ({setTitle, setOrder}) => {

    const [deptCode, setDeptCode] = useState([{dept_code:'', dept_name:''}]);
    const [teamCode, setTeamCode] = useState([{dept_code:'', team_name:'', team_code:''}]);
    const [members, setMembers] = useState([{}]);
    const [selectTeam, setSelectTeam] = useState('');
    const [selectMember, setSelectMember] = useState({});
    const {approvalLine, setApprovalLine} = useApprovalLine();
    const {referLine, setReferLine} = useReferLine();

    useEffect(()=>{
        axios.get(`${host}/members/selectDepartment`)
        .then((dept)=>{
          setDeptCode(dept.data);
        //   console.log("dept", dept.data);
    
          axios.get(`${host}/members/selectTeam`)
          .then((team)=>{
            setTeamCode(team.data);
            // console.log("team", team.data);
          })
        })
      },[])
    
      const handleTeamChange =(e)=>{
        console.log(e.target.value);
        setSelectTeam(e.target.value);
      }
    
      useEffect(() => {
        if (selectTeam !== '') {
          axios.get(`${host}/members/searchMembers/${selectTeam}`)
            .then((member) => {
            //   console.log(member.data);
              setMembers(member.data);
            })
            .catch((err) => {
              console.error(err);
            });
        }
      }, [selectTeam]);
    
      const handleMemberChange =(e)=>{
        const value = JSON.parse(e.target.value);
        const id = value.id;
        const name = value.name;
        console.log(value.id);
        console.log(value.name);
        // console.log(e.target.innerText);
        setSelectMember({id:id, name: name});
        console.log("테스트중",selectMember);
      }

      useEffect(() => {
        if (selectMember !== '') {
            if(setOrder !== "4"){
                const newApproval = {id: selectMember.id, name:selectMember.name, order: setOrder};
                setApprovalLine(newApproval);
                console.log("선택", newApproval);
            }
            // return(console.log("결과",approvalLine));
        }
    }, [selectMember, setApprovalLine, setOrder]);
      
    const handleAdd = () => {
        const newRefer = {id: selectMember.id, name:selectMember.name, order: setOrder};
        setReferLine(newRefer);
    }

    useEffect(()=>{
        // console.log(referLine);
    },[referLine])

    return(
    <div className={styles.approval_box}>
        <div className={styles.approval_title}>{setTitle}</div>
        {/* input hidden으로 order 값 부여하기 */}
        <div className={styles.approval_team}>
            <select onChange={handleTeamChange} value={selectTeam}>
            <option defaultValue="">선택</option>
                {
                    teamCode.map((team) => {
                        return (<option key={team.team_code} value={team.team_code}>{team.team_name}</option>);
                    })
                }
            </select>
        </div>
        <div className={styles.approval_name}>
            <select onChange={handleMemberChange}>
                <option defaultValue="" >선택</option>
                {
                    members.map((member) => {
                        // job_code 조인해서 job_name으로 바꾸기
                        return (<option key={member.id} value={JSON.stringify({id:member.id, name:member.name})}>{member.name} {member.job_code}</option>);
                    })
                }
            </select>
            {
                setOrder == 4 ? <button type='button' onClick={handleAdd}> 추가 </button> : ''
            }
        </div>
    </div>
    );
    
}

