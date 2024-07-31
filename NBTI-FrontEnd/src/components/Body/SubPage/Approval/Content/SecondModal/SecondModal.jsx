import { useEffect, useState } from 'react';
import styles from './SecondModal.module.css'; // 스타일시트 경로는 동일하게 유지
// import { ApprovalTree } from './ApprovalTree/ApprovalTree';
// import { ApprovalDetail } from '../ApprovalDetail/ApprovalDetail';
import { useDeptStore, useTeamStore } from '../../../../../../store/store';
import axios from 'axios';
import { host } from '../../../../../../config/config';
import { ApprovalLine } from './ApprovalLine/ApprovalLine';

const SecondModal = ({ isOpen, onClose }) => {


  const handleSubmit = (event) => {
    event.preventDefault();
    // 두 번째 모달의 폼 제출 처리
    onClose(); // 제출 후 모달 닫기
  };


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
              <div className={styles.refer_btn}>
                <ApprovalLine setTitle="참조/열람자" setOrder="4"/>
                <button type='button'>추가</button>
              </div>
              <div className={styles.form_refer}>
                <div className={styles.form_refer_box}></div>
              </div>
            </div>
          </div>
          <div className={styles.form_btns}>
            <button type="submit">다음</button>
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