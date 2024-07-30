import React, { useState } from 'react';
import styles from './SecondModal.module.css'; // 스타일시트 경로는 동일하게 유지
import { ApprovalTree } from './ApprovalTree/ApprovalTree';

const SecondModal = ({ isOpen, onClose }) => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    // 두 번째 모달의 폼 제출 처리
    console.log("제목:", title);
    console.log("내용:", content);
    onClose(); // 제출 후 모달 닫기
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2>결재선 지정</h2>
        <form onSubmit={handleSubmit}>
        <div className={styles.form_box}>
            <div className={styles.form_menu}>
              <div className={styles.form_menu_title}>조 직 도</div>
              <div className={styles.form_menu_tree}>
                {/* 양식 선택 리스트 출력 (트리형식) */}
                <ApprovalTree/>
              </div>
            </div>
            <div className={styles.form_check}>
              {/* <div>상세정보</div>
              <div className="form_detail_title"></div> */}
              {/* <FormDetail /> */}
            </div>
          </div>
          <div className={styles.form_btns}>
            <button type="submit">다음</button>
            <button type="button">닫기</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SecondModal;
