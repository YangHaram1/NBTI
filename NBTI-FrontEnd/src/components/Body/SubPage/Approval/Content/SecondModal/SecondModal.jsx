// import { useEffect, useState } from 'react';
import styles from './SecondModal.module.css'; // 스타일시트 경로는 동일하게 유지
import { useApprovalLine, useDocFormStore, useReferLine } from '../../../../../../store/store';
import { ApprovalLine } from './ApprovalLine/ApprovalLine';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { host } from '../../../../../../config/config';

const SecondModal = ({ isOpen, onClose }) => {

  const {referLine, setReferLine, deleteReferLine} = useReferLine();
  const {approvalLine} = useApprovalLine();
  const {docForm} = useDocFormStore();
  const [refer, setRefer] = useState([]);
  const [check, setCheck] = useState(false); // 결제라인 최초, 최종 유무 확인

  const handleSubmit = (event) => {
      event.preventDefault(); // 두 번째 모달의 폼 제출 처리
      onClose(); // 제출 후 모달 닫기
  };

  useEffect(()=>{
    // console.log("참조라인 데이터 확인",referLine);
    if(referLine.length > 0){
    axios.post(`${host}/members/approvalSearch`,referLine)
    .then((resp)=>{
        // console.log("데이터 확인",resp.data);
        setRefer(resp.data);
        console.log(refer);
    })
    .catch((err)=>{
        console.log(err);
    })
  }
  },[referLine])

  const navi = useNavigate();

  // 양식 추가 발생시 경로 설정 필요
  const handlePageMove = (e)=>{
    e.preventDefault();

    if(check == false){
      alert("결재는 최초결재자, 최종결재자 최소 2명은 선택하셔야합니다.");
      return; 
    }
    console.log(docForm.name);
    if(docForm.name === '휴가신청서'){
      navi("/approval/write/docVacation");
    }else if(docForm.name === '휴직신청서'){
      navi("/approval/write/docLeave");
    }else if(docForm.name ==='업무기안서'){
      navi("/approval/write/docDraft");
    }else{
      alert("오류가 발생되었습니다. 전자결재 홈으로 돌아갑니다.");
      navi("/approval");
    }
    onClose();
  }

  const deleteRefer = (id) => {
    console.log("삭제할 ID",id);
    // referLine에서 해당 id와 일치하지 않는 항목들만 필터링하여 새로운 배열을 생성
      console.log("=====참조라인:", referLine);
      deleteReferLine(id);
      // const updatedReferLine = referLine.filter(refer => refer.id !== id);
      // setReferLine(...updatedReferLine); // 참조 라인 업데이트

      // refer에서 해당 id와 일치하지 않는 항목들만 필터링하여 새로운 배열을 생성
      const updatedRefer = refer.filter(r => r.id !== id);
      setRefer(updatedRefer); // 화면 표시용 참조 라인 업데이트

      console.log("삭제 후 참조라인:", referLine);
      // console.log("참조라인:", referLine);
      console.log("삭제 후 화면 표시용 참조라인:", updatedRefer);
    }

    const isValidValue = (value) => {
      return value !== undefined && value !== null && value.trim() !== '';
    };

  //결재라인에서 최초, 최종 있는지 확인
  useEffect(() => {
    const order1Line = approvalLine.find(line => line.order === '1');
    const order3Line = approvalLine.find(line => line.order === '3');

    const isOrder1Valid = order1Line && isValidValue(order1Line.id) && isValidValue(order1Line.name);
    const isOrder3Valid = order3Line && isValidValue(order3Line.id) && isValidValue(order3Line.name);
    let result = isOrder1Valid && isOrder3Valid
    setCheck(result); // order 1과 3이 모두 있을 때만 check를 true로 설정
    // console.log("check 상태 업데이트", { isOrder1Valid, isOrder3Valid, result});
  }, [approvalLine]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2>결재선 지정</h2>
        <form onSubmit={handleSubmit}>
        <div className={styles.form_box}>
            <div className={styles.form_menu}>
              <ApprovalLine setTitle="최초결재자" setOrder="1" />
              <ApprovalLine setTitle="중간결재자" setOrder="2" />
              <ApprovalLine setTitle="최종결재자" setOrder="3" />
              <ApprovalLine setTitle="참조/열람자" setOrder="4" />
              <div className={styles.form_refer}>
                <div className={styles.form_refer_box}>
                  {
                    refer.length  > 0 ?
                    refer.map((referr)=>{
                      return(
                        <div key={referr.ID} className={styles.refer_member}>
                           {referr.NAME} ({referr.JOB_NAME}) / {referr.TEAM_NAME} <button type='button' onClick={()=>{deleteRefer(referr.ID)}}>x</button></div>
                      );
                    })
                    :''
                  }
                </div>
              </div>
            </div>
          </div>
          <div className={styles.form_btns}>
            <button type="button" onClick={handlePageMove}> 완료</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SecondModal;
