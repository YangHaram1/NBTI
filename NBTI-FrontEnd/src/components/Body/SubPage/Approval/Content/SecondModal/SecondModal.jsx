// import { useEffect, useState } from 'react';
import styles from './SecondModal.module.css'; // 스타일시트 경로는 동일하게 유지
import { useDocFormStore, useReferLine } from '../../../../../../store/store';
import { ApprovalLine } from './ApprovalLine/ApprovalLine';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const SecondModal = ({ isOpen, onClose }) => {

  const {referLine} = useReferLine();
  const {docForm} = useDocFormStore();

  const handleSubmit = (event) => {
    event.preventDefault();
    // 두 번째 모달의 폼 제출 처리
    onClose(); // 제출 후 모달 닫기
  };

  useEffect(()=>{},[]);

  const navi = useNavigate();

  // 양식 추가 발생시 경로 설정 필요
  const handlePageMove = (e)=>{
    e.preventDefault();
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


  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2>결재선 지정</h2>
        <form onSubmit={handleSubmit}>
        <div className={styles.form_box}>
            <div className={styles.form_menu}>
              <ApprovalLine setTitle="최초결재자" setOrder="1"/>
              <ApprovalLine setTitle="중간결재자" setOrder="2"/>
              <ApprovalLine setTitle="최종결재자" setOrder="3"/>
              <ApprovalLine setTitle="참조/열람자" setOrder="4"/>
              <div className={styles.form_refer}>
                <div className={styles.form_refer_box}>
                  {
                    referLine.slice(1).map((refer)=>{
                      return(
                        <div key={refer.id} className={styles.refer_member}>{refer.name} 대리 / 품질관리팀</div>
                      );
                    })
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

            {/* 조직도 출력 (트리형식) */}
            {/* <ApprovalTree/> */}
                
            {/* <div className={styles.form_check}>
             결재선 세부 정보 출력 
              <ApprovalDetail/>
            </div> */}