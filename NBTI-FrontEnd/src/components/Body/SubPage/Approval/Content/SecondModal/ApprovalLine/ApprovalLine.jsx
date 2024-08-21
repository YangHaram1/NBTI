import styles from './ApprovalLine.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { host } from '../../../../../../../config/config';
import { useApprovalLine, useReferLine } from '../../../../../../../store/store';

export const ApprovalLine = ({setTitle, setOrder, setCheck}) => {

    const [deptCode, setDeptCode] = useState([{dept_code:'', dept_name:''}]);
    const [teamCode, setTeamCode] = useState([{dept_code:'', team_name:'', team_code:''}]);
    const [members, setMembers] = useState([{}]);
    const [selectTeam, setSelectTeam] = useState('');
    const [selectMember, setSelectMember] = useState({});
    const {approvalLine, setApprovalLine} = useApprovalLine();
    const {referLine, setReferLine} = useReferLine();
    const [selectedValue, setSelectedValue] = useState("none"); // 현재 선택된 값
    const defaultValue = "none"; // 기본값

    useEffect(()=>{
        axios.get(`${host}/members/selectDepartment`)
        .then((dept)=>{
          setDeptCode(dept.data);   
          axios.get(`${host}/members/selectTeam`)
          .then((team)=>{
            setTeamCode(team.data);
          })
        })
      },[]);

    
      const handleTeamChange =(e)=>{
        setSelectTeam(e.target.value);
      };
    
      useEffect(() => {
        if (selectTeam !== '') {
          axios.get(`${host}/members/searchMembers/${selectTeam}`)
            .then((member) => {
              setMembers(member.data);
            })
            .catch((err) => {
              console.error(err);
            });
        }
      }, [selectTeam]);
    
      const handleMemberChange =(e)=>{
        // const value = JSON.parse(e.target.value);
        // const id = value.id;
        // const name = value.name;
        // setSelectMember({id:id, name: name});
        const value = e.target.value;
        if (value === defaultValue) {
            setSelectMember({}); // 기본값이 선택되면 선택된 멤버 초기화
            setSelectedValue(defaultValue); // 선택된 값 상태 업데이트
            return;
        }
        const parsedValue = JSON.parse(value);
        setSelectMember({ id: parsedValue.id, name: parsedValue.name });
        setSelectedValue(value); // 선택된 값 상태 업데이트
      };

      useEffect(()=>{
        if (selectMember.id) {
          const isDuplicate = approvalLine.some(line => line.id === selectMember.id);

          if (isDuplicate) {
              alert("이미 추가된 아이디입니다.");
              setSelectedValue(defaultValue); 
              setSelectMember({}); 
          } else {
          }
      }
      },[selectMember, setCheck])

      useEffect(() => {
        if (selectMember !== '') {
            if(setOrder !== "4"){
                const newApproval = {id: selectMember.id, name:selectMember.name, order: setOrder};
                setApprovalLine(newApproval);
                // console.log("선택", newApproval);
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
            <option value={defaultValue}>선택</option>
                {
                    teamCode.map((team) => {
                        return (<option key={team.team_code} value={team.team_code}>{team.team_name}</option>);
                    })
                }
            </select>
        </div>
        <div className={styles.approval_name}>
            <select onChange={handleMemberChange} value={selectedValue}>
                <option value={defaultValue}>선택</option>
                {
                    members.map((member) => {
                        // job_code 조인해서 job_name으로 바꾸기
                        return (<option key={member.ID} value={JSON.stringify({id:member.ID, name:member.NAME})}>{member.NAME}({member.JOB_NAME})</option>);
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

